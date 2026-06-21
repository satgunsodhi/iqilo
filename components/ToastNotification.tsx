"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Info, X, AlertTriangle } from "lucide-react";

type ToastVariant = "success" | "info" | "warning" | "error";

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => remove(id), 3200);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 flex-col gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClose = useCallback(() => {
    setLeaving(true);
    timerRef.current = setTimeout(() => onClose(), 200);
  }, [onClose]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const iconMap: Record<ToastVariant, ReactNode> = {
    success: <Check className="h-4 w-4" strokeWidth={2.5} />,
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    error: <X className="h-4 w-4" />,
  };

  const colorMap: Record<ToastVariant, { bg: string; icon: string; border: string }> = {
    success: {
      bg: "color-mix(in srgb, var(--accent-green) 10%, var(--bg-surface))",
      icon: "var(--accent-green)",
      border: "color-mix(in srgb, var(--accent-green) 35%, transparent)",
    },
    info: {
      bg: "color-mix(in srgb, var(--accent-blue) 10%, var(--bg-surface))",
      icon: "var(--accent-blue)",
      border: "color-mix(in srgb, var(--accent-blue) 35%, transparent)",
    },
    warning: {
      bg: "color-mix(in srgb, var(--accent-yellow) 10%, var(--bg-surface))",
      icon: "var(--accent-yellow)",
      border: "color-mix(in srgb, var(--accent-yellow) 35%, transparent)",
    },
    error: {
      bg: "color-mix(in srgb, var(--accent-red) 10%, var(--bg-surface))",
      icon: "var(--accent-red)",
      border: "color-mix(in srgb, var(--accent-red) 35%, transparent)",
    },
  };

  const colors = colorMap[toast.variant];

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg backdrop-blur-md ${
        leaving ? "animate-toast-out" : "animate-toast-in"
      }`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        minWidth: "240px",
        maxWidth: "360px",
      }}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: colors.border, color: colors.icon }}
      >
        {iconMap[toast.variant]}
      </span>
      <p className="flex-1 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        {toast.message}
      </p>
      <button
        type="button"
        onClick={handleClose}
        className="ml-1 rounded p-1 transition hover:opacity-70"
        style={{ color: "var(--text-faint)" }}
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
