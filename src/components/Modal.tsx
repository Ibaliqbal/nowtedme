import { ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
};

const BackdropOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75" />
  );
};

const ModalOverlay = ({ children }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-30 overflow-hidden">
      <div
        className={`bg-white p-4 rounded-lg shadow-lg text-gray-900 mx-2`}
      >
        {children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal") as HTMLDivElement;

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
