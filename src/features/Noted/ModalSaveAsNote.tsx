import { Dispatch, useContext } from "react";
import Modal from "../../components/Modal";
import { NotedContext } from "../../context/note.context";
import { useNavigate } from "react-router-dom";

type ModalSaveAsNoteProps = {
  setIsOpenModalSaveAs: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  fill: string;
  date: number;
  year: number;
  month: number;
  id: number;
  selectFolder: string;
};
const ModalSaveAsNote = ({
  setIsOpenModalSaveAs,
  title,
  fill,
  date,
  month,
  year,
  id,
  selectFolder,
}: ModalSaveAsNoteProps) => {
  const { handleCreateNoted, saveasNote } = useContext(NotedContext);
  const navigate = useNavigate();
  const handleSave = () => {
    handleCreateNoted(selectFolder, title, fill, year, month, date);
    setIsOpenModalSaveAs((prev) => !prev);
    navigate(`/${selectFolder}`);
  };

  const hanldeSaveAs = () => {
    saveasNote(title, fill, id);
    setIsOpenModalSaveAs((prev) => !prev);
    navigate(`/${selectFolder}`);
  };
  return (
    <Modal>
      <div className="p-4 flex flex-col gap-6 relative">
        <button
          onClick={() => setIsOpenModalSaveAs((prev) => !prev)}
          className="bg-red-600 w-10 h-10 text-white absolute -top-4 -right-4 rounded-tr-md"
        >
          X
        </button>
        <h3 className="mt-5 font-semibold text-xl">Do you want to save or save as on this note?</h3>
        <div className="w-full items-center flex justify-end gap-2">
          <button className="px-3 py-2" onClick={handleSave}>
            Save
          </button>
          <button className="px-3 py-2" onClick={hanldeSaveAs}>
            Save As
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSaveAsNote;
