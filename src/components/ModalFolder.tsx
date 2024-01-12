import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { FolderContext } from "../context/folder.context";

type ModalNoteProps = {
  handleHideModal: () => void;
  isOpen: boolean;
};

const ModalNote = ({ handleHideModal, isOpen }: ModalNoteProps) => {
  const { state, handleCreateFolder, removeFolder } = useContext(FolderContext);
  const [nameFolder, setNameFolder] = useState<string>("");
  console.log(state.folder);
  return (
    <Modal isOpen={isOpen}>
      <div>
        <button onClick={handleHideModal}>Close Modal</button>
        <h1>Create New Folder</h1>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNameFolder(e.target.value)
          }
          className="bg-[#181818] text-white"
        />
        <button
          onClick={() => {
            handleCreateFolder(nameFolder);
            // handleHideModal();
          }}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default ModalNote;
