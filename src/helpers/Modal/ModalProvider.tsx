import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Modal, ModalStatus } from "./Modal";

export type OpenModalActionParams = { title: string, content: ReactNode, footer?: ReactNode | undefined };
export type ModalActions = {
  open: (params: OpenModalActionParams) => void;
  close: () => void;
  pause: () => void;
  resume: () => void;
  isClosed: boolean;
  isPaused: boolean;
};
const ModalContext = createContext<ModalActions | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function ModalProvider({ children }: { children: ReactNode }): ReactNode {
  const [status, setStatus] = useState<ModalStatus>("closed");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode | undefined>();
  const [footer, setFooter] = useState<ReactNode | undefined>();

  const modal: ModalActions = {
    open: ({ title, content, footer }) => {
      setStatus("open");
      setTitle(title);
      setContent(content);
      setFooter(footer);
    },
    pause: () => setStatus("pause"),
    resume: () => setStatus("open"),
    close: () => setStatus("close"),
    isClosed: status === "closed",
    isPaused: status === "pause"
  };

  const onClosed = () => {
    setTitle("");
    setContent(<></>);
    setFooter(undefined);
    setStatus("closed");
  }

  return (<>
    <ModalContext.Provider value={modal}>
      {children}
    </ModalContext.Provider>
    <Modal status={status} title={title} footer={footer} close={modal.close} onClosed={onClosed}>
      {content}
    </Modal>
  </>
  );
}
