import { createContext, ReactNode, useContext, useState } from "react";
import { Modal, ModalStatus } from "./Modal";

export type ModalActions = {
  open: (params: { title: string, content: ReactNode, footer?: ReactNode | undefined }) => void;
  close: () => void;
  isClosed: boolean;
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
  const [footer, setFooter] = useState<ReactNode | undefined>();
  const [isClosed, setIsClosed] = useState(true);

  const modal: ModalActions = {
    open: ({ title, content, footer }) => {
      setIsClosed(false);
      setTitle(title);
      setContent(content);
      setFooter(footer);
      setStatus("open");
    },
    close: () => {
      setStatus("close");
    },
    isClosed
  }

  const onClosed = () => {
    setTitle("");
    setContent(<></>);
    setFooter(undefined);
    setIsClosed(true);
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
