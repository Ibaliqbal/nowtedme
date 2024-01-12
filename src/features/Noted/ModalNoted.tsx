import React, { useContext, useState } from "react";
import Modal from "../../components/Modal";
import { NotedContext } from "../../context/note.context";

type ModalNoteProps = {
  handleHideModal: () => void;
  isOpen: boolean;
};

const ModalNoted = ({ handleHideModal, isOpen }: ModalNoteProps) => {
  const { state, handleCreateNoted } = useContext(NotedContext);
  const [folderName, setFolderName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [fill, setFill] = useState<string>("");
  console.log(state.note);
  return (
    <Modal isOpen={isOpen}>
      <button onClick={handleHideModal}>Close Modal</button>
      <h1>Test Modal Noted</h1>
      <div>
        <label htmlFor="">Nama Folder</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFolderName(e.target.value)
          }
          className="bg-[#181818] text-white"
        />
      </div>
      <div>
        <label htmlFor="">Title</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="bg-[#181818] text-white"
        />
      </div>
      <div>
        <label htmlFor="">Desc</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFill(e.target.value)
          }
          className="bg-[#181818] text-white"
        />
      </div>
      <button
        onClick={() => {
          handleCreateNoted(folderName, title, fill);
        }}
      >
        Submit
      </button>
      {/* <button onClick={() => removeFolder(2)}>Remove folder id 2</button> */}
    </Modal>
  );
};

export default ModalNoted;
