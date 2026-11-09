import * as React from "react";
import { createPortal } from "react-dom";
import { IconX } from "./icons";
import "./modal.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Кнопки внизу окна */
  footer?: React.ReactNode;
  /** Показывать крестик в правом верхнем углу */
  closable?: boolean;
  /** Закрывать по клику на фон */
  closeOnOverlay?: boolean;
  width?: number | string;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  closable = true,
  closeOnOverlay = true,
  width = 500,
  className,
}: ModalProps) {
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="cs-modal-overlay" onMouseDown={(e) => closeOnOverlay && e.target === e.currentTarget && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={["cs-modal", className].filter(Boolean).join(" ")}
        style={{ width }}
      >
        {closable && (
          <button type="button" className="cs-modal__close" onClick={onClose} aria-label="Закрыть">
            <IconX size={18} />
          </button>
        )}
        {title && (
          <h2 id={titleId} className="cs-modal__title">
            {title}
          </h2>
        )}
        {children && <div className="cs-modal__body">{children}</div>}
        {footer && <div className="cs-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

/** Точки-индикатор шагов для пошаговых модалок (онбординг) */
export function ModalSteps({ count, current }: { count: number; current: number }) {
  return (
    <div className="cs-modal-steps">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={i === current ? "cs-modal-steps__dot cs-modal-steps__dot--active" : "cs-modal-steps__dot"} />
      ))}
    </div>
  );
}
