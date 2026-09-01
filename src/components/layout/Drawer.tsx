"use client";

import { useEffect, useRef, type ReactNode } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
};

export function Drawer({ isOpen, onClose, closeLabel, children }: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        data-testid="drawer-overlay"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative ml-auto flex h-full w-72 flex-col gap-6 p-6"
        style={{ background: "var(--color-bg)" }}
      >
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
