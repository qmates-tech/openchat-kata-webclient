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
  });

  it("open the modal", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);

    await userEvent.click(screen.getByText("Open modal"));

    screen.logTestingPlaygroundURL();
    expect(screen.getByText("A Title", { selector: 'dialog header *'})).toBeVisible();
    expect(screen.getByText("Some Content", { selector: 'dialog p'})).toBeVisible();
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
    });
  });

  it("close the modal on overlay click", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.click(screen.getByRole("dialog"));

    await waitFor(() => {
      expect(screen.queryByText("A Title")).not.toBeInTheDocument();
      expect(screen.queryByText("Some Content")).not.toBeInTheDocument();
    });
  });

  it("close the modal on ESC key press", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText("A Title")).not.toBeInTheDocument();
      expect(screen.queryByText("Some Content")).not.toBeInTheDocument();
    });
  });

  it("ESC key press with a closed modal does nothing", async () => {
    render(<ModalProvider>
      <TestModal title='A Title'><p>Some Content</p></TestModal>
    </ModalProvider>);
    await userEvent.click(screen.getByText("Open modal"));

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText("A Title")).not.toBeInTheDocument();
      expect(screen.queryByText("Some Content")).not.toBeInTheDocument();
    });
  });
})

function TestModal({ title, children }: { title: string, children?: React.ReactNode | undefined }) {
  const { open } = useModal();

  return (
    <button onClick={() => open(title, children)}>Open modal</button>
  )
}

function suppressConsoleErrors() {
  vi.spyOn(console, 'error').mockImplementation(() => { });
}
