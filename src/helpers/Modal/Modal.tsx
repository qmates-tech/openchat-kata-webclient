import { ReactNode, useEffect, useMemo, useState } from "react";
import "./Modal.css";

export type ModalStatus = "open" | "close" | "pause" | "closed" | undefined;
type ModalInternalStatus = "opening" | "open" | "pausing" | "paused" | "closing" | "closed";
export type ModalProps = {
  status: ModalStatus,
  title: string,
  close: () => void,
  onClosed: () => void,
  footer?: ReactNode | undefined,
  children?: ReactNode | undefined
}
export function Modal({ status, title, close, onClosed, footer, children }: ModalProps) {
  const modalAnimationDuration = 400;
  const htmlTag = document.querySelector("html")!;
  const [internalStatus, setInternalStatus] = useState<ModalInternalStatus>("closed");
  const isOpen = useMemo<boolean>(() => internalStatus !== "closed" && internalStatus !== "paused", [internalStatus]);
  const isActive = useMemo<boolean>(() => {
    return internalStatus !== "closing" && internalStatus !== "closed" &&
      internalStatus !== "pausing" && internalStatus !== "paused"
  }, [internalStatus]);

  useEffect(syncInternalStatus, [status]);
  useEffect(handleAnimationOnStatusChange, [internalStatus]);
  useEffect(handleEscapeKey, [isActive]);

  return (
    <dialog className="modal" open={isOpen} onClick={onOverlayClick}>
      <article>
        <header>
          <h5>{title}</h5>
          <button aria-label="Close Modal" rel="prev" onClick={close}></button>
        </header>
        <div className="content">
          {children}
        </div>
        {footer && <footer>{footer}</footer>}
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
    if (status === "close") {
      setInternalStatus("closing");
    }
    if (status === "pause") {
      setInternalStatus("pausing");
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
    if (internalStatus == "closed") {
      htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      onClosed();
    }
    if (internalStatus == "pausing") {
      htmlTag.classList.add("modal-is-closing");
      setTimeout(() => setInternalStatus("paused"), modalAnimationDuration);
    }
    if (internalStatus == "paused") {
      htmlTag.classList.remove("modal-is-open", "modal-is-closing");
    }
  }

  function handleEscapeKey() {
    function onKeyDown(event: KeyboardEvent) {
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
