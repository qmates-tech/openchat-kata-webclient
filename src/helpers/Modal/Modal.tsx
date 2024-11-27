import { ReactNode, useEffect, useMemo, useState } from "react";

export type ModalStatus = "open" | "close" | undefined;
type ModalInternalStatus = "opening" | "open" | "closing" | "closed";

export function Modal({ status, title, close, onClosed, children }: { status: ModalStatus, title: string, close: () => void, onClosed: () => void, children?: ReactNode | undefined }) {
  const modalAnimationDuration = 400;
  const htmlTag = document.querySelector("html")!;
  const [internalStatus, setInternalStatus] = useState<ModalInternalStatus>("closed");
  const isOpen = useMemo<boolean>(() => internalStatus !== "closed", [internalStatus]);
  const isActive = useMemo<boolean>(() => internalStatus !== "closing" && internalStatus !== "closed", [internalStatus]);

  useEffect(syncInternalStatus, [status]);
  useEffect(handleAnimationOnStatusChange, [internalStatus]);
  useEffect(handleEscapeKey, [isActive]);

  return (
    <dialog open={isOpen} onClick={onOverlayClick}>
      <article>
        <header>
          <h3>{title}</h3>
          <button aria-label="Close Modal" rel="prev" onClick={close}></button>
        </header>
        {children}
      </article>
    </dialog>
  );

  function onOverlayClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  function syncInternalStatus() {
    if (status === "open") {
      setInternalStatus("opening");
    }
    if(status === "close") {
      setInternalStatus("closing");
    }
  }

  function handleAnimationOnStatusChange() {
    if (internalStatus == "opening") {
      htmlTag.classList.remove("modal-is-closing");
      htmlTag.classList.add("modal-is-open", "modal-is-opening");
      setTimeout(() => setInternalStatus("open"), modalAnimationDuration);
    }
    if (internalStatus == "open") {
      htmlTag.classList.remove("modal-is-opening");
    }
    if (internalStatus == "closing") {
      htmlTag.classList.add("modal-is-closing");
      setTimeout(() => setInternalStatus("closed"), modalAnimationDuration);
    }
    if(internalStatus == "closed") {
      htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      onClosed();
    }
  }

  function handleEscapeKey() {
    function onKeyDown (event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    if (isActive) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }
}
