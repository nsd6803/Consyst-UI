import * as React from "react";
import "./timeline.css";

export type StepStatus = "done" | "current" | "next";

/* ------------------------------------------------------------------ */
/* ProgressStep — круглый индикатор с номером этапа                    */
/* ------------------------------------------------------------------ */

export interface ProgressStepProps extends React.HTMLAttributes<HTMLSpanElement> {
  number: React.ReactNode;
  status?: StepStatus;
  /** Активное состояние — наведение или выбранный этап */
  active?: boolean;
}

export function ProgressStep({ number, status = "next", active = false, className, ...props }: ProgressStepProps) {
  return (
    <span
      className={["cs-progress-step", `cs-progress-step--${status}`, active && "cs-progress-step--active", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {number}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* TimelineStep — один этап: индикатор, линия до следующего, подписи   */
/* ------------------------------------------------------------------ */

export interface TimelineStepProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  number: number;
  title: React.ReactNode;
  /** Подпись над названием, по умолчанию «Этап N» */
  caption?: React.ReactNode;
  status?: StepStatus;
  selected?: boolean;
  /** Показывать линию к следующему этапу */
  connector?: boolean;
  /** Сроки этапа */
  dates?: React.ReactNode;
  onSelect?: () => void;
}

export function TimelineStep({
  number,
  title,
  caption,
  status = "next",
  selected = false,
  connector = true,
  dates,
  onSelect,
  className,
  ...props
}: TimelineStepProps) {
  return (
    <div
      className={["cs-timeline-step", selected && "cs-timeline-step--selected", onSelect && "cs-timeline-step--clickable", className]
        .filter(Boolean)
        .join(" ")}
      onClick={onSelect}
      {...props}
    >
      <div className="cs-timeline-step__track">
        <ProgressStep number={number} status={status} active={selected} />
        {connector && <span className={`cs-timeline-step__line cs-timeline-step__line--${status}`} />}
      </div>
      <div className="cs-timeline-step__caption">{caption ?? `Этап ${number}`}</div>
      <div className="cs-timeline-step__title">{title}</div>
      {dates && <div className="cs-timeline-step__dates">{dates}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline — карточка с этапами, растянутыми по ширине                */
/* ------------------------------------------------------------------ */

export interface TimelineProps {
  steps: { title: React.ReactNode; dates?: React.ReactNode }[];
  /** Индекс текущего этапа (с 0). Предыдущие — done, последующие — next */
  current: number;
  selected?: number;
  onSelect?: (index: number) => void;
  bordered?: boolean;
  className?: string;
}

export function Timeline({ steps, current, selected, onSelect, bordered = true, className }: TimelineProps) {
  return (
    <div className={["cs-timeline", bordered && "cs-timeline--bordered", className].filter(Boolean).join(" ")}>
      {steps.map((s, i) => (
        <TimelineStep
          key={i}
          number={i + 1}
          title={s.title}
          dates={s.dates}
          status={i < current ? "done" : i === current ? "current" : "next"}
          selected={selected === i}
          connector={i < steps.length - 1}
          onSelect={onSelect ? () => onSelect(i) : undefined}
        />
      ))}
    </div>
  );
}
