import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider, useModal } from '../../../src/helpers/Modal/ModalProvider';

describe("ModalProvider", () => {
  it('throw error if it is used outside its Provider', async () => {
    suppressConsoleErrors();

    expect(() => render(<TestModal title='A Title'><p>Some Content</p></TestModal>))
      .toThrowError('useModal must be used within a ModalProvider');
  });

  it("the modal is closed", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);

    expect(screen.queryByText("A Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Some Content")).not.toBeInTheDocument();
    expect(screen.queryByRole("footer")).not.toBeInTheDocument();
  });

  it("open the modal without footer", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);

    await userEvent.click(screen.getByText("Open modal"));

    screen.logTestingPlaygroundURL();
    expect(screen.getByText("A Title", { selector: 'dialog header *'})).toBeVisible();
    expect(screen.getByText("Some Content", { selector: 'dialog p'})).toBeVisible();
    expect(screen.queryByText("footer text", { selector: "footer" })).not.toBeInTheDocument();
  });

  it("open the modal with footer", async () => {
    render(<ModalProvider>
      <TestModal title='A Title' footer="footer text"><p>Some Content</p></TestModal>
    </ModalProvider>);

    await userEvent.click(screen.getByText("Open modal"));

    screen.logTestingPlaygroundURL();
    expect(screen.getByText("A Title", { selector: 'dialog header *'})).toBeVisible();
    expect(screen.getByText("Some Content", { selector: 'dialog p'})).toBeVisible();
    expect(screen.getByText("footer text", { selector: "footer" })).toBeVisible();
  });

  it("close the modal on close icon", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.click(screen.getByLabelText("Close Modal"));

    await waitFor(() => {
      expect(screen.queryByText("A Title")).not.toBeInTheDocument();
      expect(screen.queryByText("Some Content")).not.toBeInTheDocument();
      expect(screen.queryByText("footer text", { selector: "footer" })).not.toBeInTheDocument();
    });
  });

  it("close the modal on overlay click", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.click(screen.getByRole("dialog"));

    await waitFor(() => expect(screen.queryByText("A Title")).not.toBeInTheDocument());
  });

  it("close the modal on ESC key press", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByText("A Title")).not.toBeInTheDocument());
  });

  it("isClosed is true before opening and after closed", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);

    expect(screen.queryByText("isClosed = true")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Open modal"));

    expect(screen.queryByText("isClosed = false")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Close Modal"));

    expect(screen.queryByText("isClosed = false")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("isClosed = true")).toBeInTheDocument();
    });
  });
})

function TestModal({ title, footer, children }: { title: string, footer?: string | undefined, children?: React.ReactNode | undefined }) {
  const { open, isClosed } = useModal();
  const footerElement = <>{footer}</> || undefined

  return (<>
    <button onClick={() => open({title, content: children, footer: footerElement})}>Open modal</button>
    <div>isClosed = {isClosed ? 'true' : 'false'}</div>
  </>)
}

function suppressConsoleErrors() {
  vi.spyOn(console, 'error').mockImplementation(() => { });
}
