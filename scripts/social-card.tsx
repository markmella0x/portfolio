import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { profile } from '../src/data/profile';

function SocialCard(): JSX.Element {
  return (
    <main>
      <div className="intro">
        <p className="role">{profile.title}</p>
        <h1>
          {profile.name.replace(/\.$/, '')}
          <span>.</span>
        </h1>
        <h2>
          {profile.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <ul>
          {profile.focus.map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
      </div>
      <div className="composition" aria-hidden="true">
        <div className="layer layer-back" />
        <div className="layer layer-middle" />
        <div className="layer layer-front">
          <svg viewBox="0 0 120 120" fill="none">
            <path
              d="m60 20 40 23-40 23-40-23 40-23Zm-40 40 40 23 40-23M20 77l40 23 40-23"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}

const font = '/fonts/archivo-latin.woff2';
const html =
  '<!doctype html><html lang="en"><meta charset="utf-8"><link rel="icon" href="/favicon.svg"><style>' +
  '@font-face{font-family:Archivo;src:url("' +
  font +
  '") format("woff2");font-weight:100 900}' +
  '*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f7f8fb;color:#20232d;font-family:Archivo,sans-serif}main{height:100%;padding:70px 78px;display:flex;align-items:center;gap:36px}.intro{flex:1;min-width:0}.role{font-size:21px;margin:0 0 24px;color:#596071}h1{font-size:118px;font-weight:600;letter-spacing:-8px;line-height:1;margin:0 0 28px}h1 span{color:#284fd8}h2{font-size:35px;line-height:1.25;font-weight:450;letter-spacing:-1px;margin:0 0 35px}h2 span{display:block}ul{display:flex;list-style:none;padding:0;margin:0;gap:22px;font-size:16px;color:#596071}li{padding-left:13px;border-left:2px solid #d9deea}.composition{position:relative;width:265px;height:300px;flex-shrink:0}.layer{position:absolute;border:1px solid #d9deea;border-radius:30px;width:225px;height:225px}.layer-back{top:0;left:40px;background:#edf0f7}.layer-middle{top:35px;left:20px;background:#e7edff}.layer-front{top:70px;left:0;background:#fff;display:grid;place-items:center;color:#284fd8}.layer-front svg{width:112px;height:112px}' +
  '</style><body>' +
  renderToStaticMarkup(<SocialCard />) +
  '</body></html>';
await mkdir(resolve('output/social'), { recursive: true });
await writeFile(resolve('output/social/card.html'), html);
process.stdout.write('Prepared output/social/card.html for a 1200 × 630 PNG capture.\n');
