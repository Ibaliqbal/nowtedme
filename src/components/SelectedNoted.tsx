import { useContext, useEffect, useState } from "react";
import {
  BsThreeDots,
  BsCalendarMinus,
  BsFolder,
  BsTrash,
  BsStar,
  BsStarFill,
  BsCheckLg,
} from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FolderContext } from "../context/folder.context";
import { NotedContext } from "../context/note.context";
import { useLocation, useNavigate } from "react-router-dom";
import ModalSaveAsNote from "../features/Noted/ModalSaveAsNote";

type SelectedNotedProps = {
  idNoted?: string;
};

const SelectedNoted = ({ idNoted }: SelectedNotedProps) => {
  const { state: folders } = useContext(FolderContext);
  const { state, handleCreateNoted, removeNote, bookmarkNote } =
    useContext(NotedContext);
  const [value, setValue] = useState<string>("");
  const [titleNote, setTitleNote] = useState<string>("");
  const [selectFolder, setSelectFolder] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [isOpenSaveAs, setIsOpenSaveAs] = useState<boolean>(false);
  const location = useLocation();
  const getFullDate = new Date();
  const navigate = useNavigate();

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
        setSelectFolder(findNoted.folderName);
        setValue(findNoted.fillNote);
        setTitleNote(findNoted.title);
        setYear(findNoted.year);
        setMonth(findNoted.month);
        setDate(findNoted.date);
        setBookmark(findNoted.bookmark);
      }
    }
  }, [idNoted]);

  useEffect(() => {
    const idNote: number = parseInt(idNoted ?? "");
    const findNoted = state.note.find((note) => note.id === idNote);
    if (findNoted) {
      setSelectFolder(findNoted.folderName);
      setValue(findNoted.fillNote);
      setTitleNote(findNoted.title);
      setYear(findNoted.year);
      setMonth(findNoted.month);
      setDate(findNoted.date);
      setBookmark(findNoted.bookmark);
    }
  }, [state.note]);

  useEffect(() => {
    setYear(getFullDate.getFullYear());
    setMonth(getFullDate.getMonth());
    setDate(getFullDate.getDate());
  }, []);

  const handleSeeMore = (): void => {
    setIsOpenMore((prev) => !prev);
  };

  const handleSave = (): void => {
    if (idNoted) {
      setIsOpenSaveAs((prev) => !prev);
    } else {
      const selFolder = selectFolder === "Select Folder" ? "" : selectFolder;
      handleCreateNoted(selFolder, titleNote, value, year, month, date);
      if (selectFolder !== "Select Folder") {
        navigate(`/${selectFolder}`);
      } else {
        navigate("/");
      }
      setValue("");
      setTitleNote("");
      setSelectFolder("Select Folder");
    }
  };

  const handleDelete = () => {
    if (idNoted) {
      const idNote = parseInt(idNoted);
      const findNoted = state.note.find((note) => note.id === idNote);
      if (findNoted) {
        removeNote(findNoted?.id);
        if (selectFolder !== "Select Folder") {
          navigate(`/${encodeURIComponent(selectFolder)}`);
        } else {
          navigate("/");
        }
      }
    }
  };

  const hanldeBookMark = () => {
    if (idNoted) {
      const idNote = parseInt(idNoted);
      bookmarkNote(idNote);
    }
  };

  return (
    <>
      {isOpenSaveAs ? (
        <ModalSaveAsNote
          setIsOpenModalSaveAs={setIsOpenSaveAs}
          title={titleNote}
          fill={value}
          date={date}
          month={month}
          year={year}
          selectFolder={selectFolder}
        />
      ) : null}
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
                className={`absolute p-4 bg-note top-5 right-[70px] ${
                  isOpenMore ? "opcaity-100 scale-100" : "opacity-0 scale-0"
                } transition-all duration-300 ease-linear origin-top-right flex flex-col justify-between gap-3 rounded-lg`}
              >
                <h3
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={handleSave}
                >
                  <BsCheckLg className="text-xl" /> Save
                </h3>
                {idNoted ? (
                  <h3
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={hanldeBookMark}
                  >
                    {bookmark ? (
                      <BsStarFill className="text-xl" />
                    ) : (
                      <BsStar className="text-xl" />
                    )}
                    Favorite
                  </h3>
                ) : null}
                {idNoted ? (
                  <h3
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <BsTrash className="text-xl" /> Delete
                  </h3>
                ) : null}
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
              {idNoted ? (
                <p>{selectFolder}</p>
              ) : (
                <select
                  name=""
                  id=""
                  className="text-black px-5 py-2 rounded-md"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectFolder(e.target.value)
                  }
                  value={selectFolder}
                >
                  <option value="Select Folder">Select Folder</option>
                  {folders.folder.length ? (
                    folders.folder.map((folder) => {
                      return (
                        <option value={folder.nameFolder} key={folder.idFolder}>
                          {folder.nameFolder.replace(/-/g, " ")}
                        </option>
                      );
                    })
                  ) : (
                    <option value="No Folder">No Folder</option>
                  )}
                </select>
              )}
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
    </>
  );
};

export default SelectedNoted;
