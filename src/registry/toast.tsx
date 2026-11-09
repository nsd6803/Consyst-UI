import * as React from "react";
import { IconCircleCheck, IconCircleX, IconInfo, IconWarning, IconX } from "./icons";
import "./toast.css";

export type ToastType = "success" | "error" | "info" | "warning";

const icons: Record<ToastType, React.ReactNode> = {
  success: <IconCircleCheck size={16} />,
  error: <IconCircleX size={16} />,
  info: <IconInfo size={16} />,
  warning: <IconWarning size={16} />,
};

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: ToastType;
  title: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
}

/** Всплывающее уведомление (toast / snackbar) */
export function Toast({ type = "success", title, description, onClose, className, ...props }: ToastProps) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={["cs-toast", `cs-toast--${type}`, className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="cs-toast__header">
        <span className="cs-toast__icon">{icons[type]}</span>
        <span className="cs-toast__title">{title}</span>
        {onClose && (
          <button type="button" className="cs-toast__close" onClick={onClose} aria-label="Закрыть">
            <IconX size={16} />
          </button>
        )}
      </div>
      {description && <div className="cs-toast__description">{description}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Глобальные тосты: toast({...}) + <Toaster /> в корне приложения     */
/* ------------------------------------------------------------------ */

export type ToastOptions = {
  type?: ToastType;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Время показа в мс, 0 — не скрывать автоматически */
  duration?: number;
};
type ToastItem = ToastOptions & { id: number };
let items: ToastItem[] = [];
let counter = 0;
const listeners = new Set<(items: ToastItem[]) => void>();
const emit = () => listeners.forEach((l) => l(items));

export function toast(options: ToastOptions) {
  const id = ++counter;
  items = [...items, { duration: 4000, ...options, id }];
  emit();
  return id;
}
toast.dismiss = (id: number) => {
  items = items.filter((t) => t.id !== id);
  emit();
};

export function Toaster({ position = "bottom-right" }: { position?: "top-right" | "bottom-right" | "top-center" | "bottom-center" }) {
  const [list, setList] = React.useState<ToastItem[]>(items);
  React.useEffect(() => {
    listeners.add(setList);
    return () => {
      listeners.delete(setList);
    };
  }, []);

  return (
    <div className={`cs-toaster cs-toaster--${position}`}>
      {list.map(({ id, duration, ...t }) => (
        <AutoDismiss key={id} id={id} duration={duration}>
          <Toast {...t} onClose={() => toast.dismiss(id)} />
        </AutoDismiss>
      ))}
    </div>
  );
}

function AutoDismiss({ id, duration, children }: { id: number; duration?: number; children: React.ReactNode }) {
  React.useEffect(() => {
    if (!duration) return;
    const t = window.setTimeout(() => toast.dismiss(id), duration);
    return () => window.clearTimeout(t);
  }, [id, duration]);
  return <>{children}</>;
}
