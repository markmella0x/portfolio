import { aiWorkflow } from '../data/aiWorkflow';
import { ui } from '../data/ui';

export function AiSection(): JSX.Element {
  return (
    <section className="section container" id="ai-workflow" aria-labelledby="ai-title">
      <div className="ai-intro">
        <h2 id="ai-title">{aiWorkflow.title}</h2>
        <p>{aiWorkflow.introduction}</p>
      </div>
      <ol className="ai-steps">
        {aiWorkflow.steps.map((step, index) => (
          <li key={step.title}>
            <span className="step-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <ul className="skill-tags" aria-label={ui.workflowToolsLabel}>
        {aiWorkflow.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </section>
  );
}
