/* exported exportResume */
// A playwright-cli callback, run from the portfolio directory with Chrome.
async function exportResume(page) {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto('http://127.0.0.1:5173/resume/');
  await page.locator('.resume-document h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  try {
    const sheets = await page.evaluate(() =>
      [...document.querySelectorAll('.resume-sheet')].map((sheet) => {
        const bounds = sheet.getBoundingClientRect();
        const content = sheet.querySelector('.resume-sheet-content').getBoundingClientRect();
        const footer = sheet.querySelector('.resume-sheet-footer').getBoundingClientRect();
        const padding = parseFloat(getComputedStyle(sheet).paddingBottom);
        return {
          width: bounds.width,
          height: bounds.height,
          fits:
            content.bottom <= bounds.bottom - padding + 1 &&
            (!footer.height || footer.bottom <= bounds.bottom - padding + 1),
        };
      }),
    );
    if (sheets.length !== 2 || sheets.some((sheet) => !sheet.fits)) {
      throw new Error('Résumé content must fit two A4 pages, including their margins.');
    }
    const filename = await page
      .locator('.resume-toolbar a[download]')
      .getAttribute('download');
    if (!/^[\w-]+\.pdf$/.test(filename)) throw new Error('Unexpected résumé PDF filename.');
    const path = 'public/resume/' + filename;
    await page.pdf({
      path,
      format: 'A4',
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
      tagged: true,
    });
    return { path, pages: sheets.length, sheets };
  } finally {
    await page.emulateMedia({ media: 'screen' });
  }
}
