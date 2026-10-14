import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { workbench } from '../data/workbench';
import type { WorkbenchPhase } from '../types';

function PhaseIcon({ phase }: { phase: WorkbenchPhase }): JSX.Element {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {phase === 'scope' ? (
          <>
            <path d="M10 5H5v5m17-5h5v5M5 22v5h5m17-5v5h-5" />
            <rect x="11" y="11" width="10" height="10" rx="2" />
          </>
        ) : phase === 'implement' ? (
          <>
            <path d="m16 4 12 7-12 7-12-7 12-7Z" />
            <path d="m4 16 12 7 12-7M4 21l12 7 12-7" />
          </>
        ) : (
          <>
            <rect x="5" y="5" width="22" height="22" rx="7" />
            <path d="m10 16 4 4 8-8" />
          </>
        )}
      </g>
    </svg>
  );
}

export function EngineeringWorkbench(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % workbench.steps.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + workbench.steps.length) % workbench.steps.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = workbench.steps.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <section className="workbench" aria-labelledby="workbench-title">
      <div className="workbench-heading">
        <h3 id="workbench-title">{workbench.title}</h3>
        <span className="workbench-mark" aria-hidden="true">
          <PhaseIcon phase="implement" />
        </span>
      </div>
      <div className="workbench-tabs" role="tablist" aria-label={workbench.navigationLabel}>
        <span className="workbench-connection" aria-hidden="true">
          <span className="workbench-signal" />
        </span>
        {workbench.steps.map((step, index) => (
          <button
            className="workbench-tab"
            type="button"
            role="tab"
            id={'workbench-tab-' + step.id}
            aria-controls={'workbench-panel-' + step.id}
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
            key={step.id}
          >
            <PhaseIcon phase={step.id} />
            <span>{step.label}</span>
          </button>
        ))}
      </div>
      <div className="workbench-content">
        {workbench.steps.map((step, index) => (
          <div
            className="workbench-panel"
            id={'workbench-panel-' + step.id}
            role="tabpanel"
            aria-labelledby={'workbench-tab-' + step.id}
            hidden={activeIndex !== index}
            tabIndex={0}
            key={step.id}
          >
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <ul>
              {step.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="workbench-note">{workbench.note}</p>
    </section>
  );
}
