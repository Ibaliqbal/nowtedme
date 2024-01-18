import React, { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { FolderContext } from "../../context/folder.context";

type ModalNoteProps = {
  handleHideModal: () => void;
};

const ModalFolder = ({ handleHideModal }: ModalNoteProps) => {
  const { handleCreateFolder } = useContext(FolderContext);
  const [nameFolder, setNameFolder] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Modal>
      <div className="p-4 flex flex-col gap-6 relative">
        <button
          onClick={handleHideModal}
          className="bg-red-600 w-10 h-10 text-white absolute -top-4 -right-4 rounded-tr-md"
        >
          X
        </button>
        <h1 className="text-center text-xl mt-5">Create New Folder</h1>
        <div className="flex items-center gap-6">
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameFolder(e.target.value)
            }
            ref={inputRef}
            className="bg-[#181818] text-white px-4 py-2"
          />
          <button
            onClick={() => {
              handleCreateFolder(nameFolder);
              handleHideModal();
            }}
            className="bg-green-700 px-3 py-2 rounded-sm text-white"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFolder;
