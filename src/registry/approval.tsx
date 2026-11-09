import * as React from "react";
import { IconCircleCheck, IconGraduation, IconRotate } from "./icons";
import "./approval.css";

export type ApprovalStatus = "neutral" | "returned" | "approved";

const markerIcons: Record<ApprovalStatus, React.ReactNode> = {
  neutral: <IconGraduation size={10} />,
  returned: <IconRotate size={10} strokeWidth={2.5} />,
  approved: <IconCircleCheck size={10} strokeWidth={2.5} />,
};

/** Иконка события: neutral — действие практиканта, returned — возврат, approved — согласование */
export function ApprovalMarker({ status = "neutral" }: { status?: ApprovalStatus }) {
  return <span className={`cs-approval-marker cs-approval-marker--${status}`}>{markerIcons[status]}</span>;
}

/** Комментарий к событию, например причина возврата на доработку */
export function ApprovalComment({ author, children }: { author: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="cs-approval-comment">
      <div className="cs-approval-comment__author">{author}</div>
      <div className="cs-approval-comment__text">{children}</div>
    </div>
  );
}

export interface ApprovalEventProps {
  status?: ApprovalStatus;
  title: React.ReactNode;
  date: React.ReactNode;
  comment?: { author: React.ReactNode; text: React.ReactNode };
  /** Линия к следующему событию */
  connector?: boolean;
}

export function ApprovalEvent({ status = "neutral", title, date, comment, connector = true }: ApprovalEventProps) {
  return (
    <div className="cs-approval-event">
      <div className="cs-approval-event__rail">
        <ApprovalMarker status={status} />
        {connector && <span className="cs-approval-event__line" />}
      </div>
      <div className="cs-approval-event__body">
        <div className="cs-approval-event__title">{title}</div>
        <div className="cs-approval-event__date">{date}</div>
        {comment && <ApprovalComment author={comment.author}>{comment.text}</ApprovalComment>}
      </div>
    </div>
  );
}

export interface ApprovalHistoryProps {
  title?: React.ReactNode;
  events: ApprovalEventProps[];
  /** Фиксированная высота ленты; лента прижата к низу и затухает сверху */
  height?: number;
  className?: string;
}

export function ApprovalHistory({ title = "Ход согласования", events, height = 360, className }: ApprovalHistoryProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [events.length]);

  return (
    <section className={["cs-approval-history", className].filter(Boolean).join(" ")}>
      <h3 className="cs-approval-history__title">{title}</h3>
      <div ref={scrollRef} className="cs-approval-history__feed" style={{ height }}>
        <div className="cs-approval-history__inner">
          {events.map((e, i) => (
            <ApprovalEvent key={i} {...e} connector={i < events.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
