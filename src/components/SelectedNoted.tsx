import { useContext, useEffect, useState } from "react";
import {
  BsThreeDots,
  BsCalendarMinus,
  BsFolder,
  BsTrash,
  BsStar,
  BsCheckLg,
} from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FolderContext } from "../context/folder.context";
import { NotedContext } from "../context/note.context";
import { useLocation } from "react-router-dom";

type SelectedNotedProps = {
  idNoted?: string;
};

const SelectedNoted = ({ idNoted }: SelectedNotedProps) => {
  const [value, setValue] = useState<string>("");
  const [titleNote, setTitleNote] = useState<string>("");
  const { state: folders } = useContext(FolderContext);
  const { state, handleCreateNoted } = useContext(NotedContext);
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [selectFolder, setSelectFolder] = useState<string>("");
  const location = useLocation();
  const getFullDate = new Date();

  useEffect(() => {
    if (location.pathname === "/create-note") {
      setValue("");
      setTitleNote("");
      setYear(getFullDate.getFullYear());
      setMonth(getFullDate.getMonth());
      setDate(getFullDate.getDate());
    } else {
      const idNote: number = parseInt(idNoted ?? "");
      const findNoted = state.note.find((note) => note.id === idNote);
      if (findNoted) {
        setValue(findNoted.fillNote);
        setTitleNote(findNoted.title);
        setYear(findNoted.year);
        setMonth(findNoted.month);
        setDate(findNoted.date);
      }
    }
  }, [idNoted]);

  useEffect(() => {
    setYear(getFullDate.getFullYear());
    setMonth(getFullDate.getMonth());
    setDate(getFullDate.getDate());
  }, []);

  const handleSeeMore = (): void => {
    setIsOpenMore((prev) => !prev);
  };

  const handleSave = (): void => {
    const selFolder = selectFolder === "Select Folder" ? "" : selectFolder;
    handleCreateNoted(selFolder, titleNote, value, year, month, date);
    console.log(state.note);
    setValue("");
    setTitleNote("");
    setSelectFolder("Select Folder");
  };

  return (
    <section className="px-4 py-3 text-white flex flex-col gap-4 h-full parent">
      <div className="child-1 flex flex-col gap-4 mb-3">
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            className="p-3 rounded-md text-xl basis-4/5 bg-[#181818]"
            placeholder="Write some text to title...."
            value={titleNote}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitleNote(e.target.value)
            }
          />
          <div className="basis-1/5 flex justify-center items-center relative">
            <button
              className="border-2 border-slate-600 rounded-full p-2"
              onClick={handleSeeMore}
            >
              <BsThreeDots className="text-2xl" />
            </button>
            <div
              className={`absolute p-4 bg-blue-400 top-5 right-[70px] ${
                isOpenMore ? "opcaity-100 scale-100" : "opacity-0 scale-0"
              } transition-all duration-300 ease-linear origin-top-right flex flex-col justify-between gap-3 rounded-lg`}
            >
              <h3
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleSave}
              >
                <BsCheckLg className="text-xl" /> Save
              </h3>
              <h3 className="flex items-center gap-3 cursor-pointer">
                <BsStar className="text-xl" /> Favorite
              </h3>
              <h3 className="flex items-center gap-3 cursor-pointer">
                <BsTrash className="text-xl" /> Delete
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-28 pb-6 border-b-2 border-b-slate-600">
            <h3 className="flex items-center gap-6 text-md">
              <BsCalendarMinus />
              Date
            </h3>
            <p>{`${year}/${date}/${month + 1}`}</p>
          </div>
          <div className="w-full flex gap-28 pb-6 border-b-2 border-b-slate-600">
            <h3 className="flex items-center gap-6 text-md">
              <BsFolder />
              Folder
            </h3>
            <select
              name=""
              id=""
              className="text-black px-5 py-2 rounded-md"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectFolder(e.target.value)
              }
            >
              <option value="Select Folder">Select Folder</option>
              {folders.folder.length ? (
                folders.folder.map((folder) => {
                  return (
                    <option value={folder.nameFolder} key={folder.idFolder}>
                      {folder.nameFolder}
                    </option>
                  );
                })
              ) : (
                <option value="No Folder">No Folder</option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto max-h-full">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="text-white max-h-full desc overflow-auto"
        />
      </div>
    </section>
  );
};

export default SelectedNoted;
