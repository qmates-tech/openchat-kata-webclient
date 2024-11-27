import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Modal, ModalStatus } from "./Modal";

export type ModalActions = {
  open: (title: string, content: ReactNode) => void;
  close: () => void;
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
  const [status, setStatus] = useState<ModalStatus>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode | undefined>();

  const modal: ModalActions = {
    open: (title: string, content: ReactNode | undefined) => {
      setTitle(title);
      setContent(content);
      setStatus("open");
    },
    close: () => {
      setStatus("close");
    }
  }

  const onClosed = () => {
    setTitle("");
    setContent(<></>);
  }

  return (
    <ModalContext.Provider value={modal}>
      {children}
      <Modal status={status} title={title} close={modal.close} onClosed={onClosed}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}
