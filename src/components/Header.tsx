import { useContext, useEffect, useState } from "react";
import {
  TiFolderAdd,
  TiFolder,
  TiFolderOpen,
  TiStarOutline,
  TiTrash,
  TiHome,
} from "react-icons/ti";
import { FolderContext } from "../context/folder.context";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Folder } from "../type/folder.type";
import { Note } from "../type/note.type";
import { NotedContext } from "../context/note.context";
import { AuthContext } from "../context/auth.context";

type HeaderProps = {
  handleHideModal: () => void;
};

const Header = ({ handleHideModal }: HeaderProps) => {
  const user = useContext(AuthContext);
  const { state, removeFolder, renderFolder } = useContext(FolderContext);
  const { state: noted, removeNote } = useContext(NotedContext);
  const [folders, setFolders] = useState<Folder[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setFolders(state.folder);
  }, [state.folder]);
  useEffect(() => {
    if (folders?.length) {
      localStorage.setItem("folders", JSON.stringify(folders));
    }
  }, [folders]);
  useEffect(() => {
    const folder = localStorage.getItem("folders");
    if (folder) {
      const parseFolder = JSON.parse(folder) as Folder[];
      if (parseFolder.length) {
        renderFolder(parseFolder);
        setFolders(parseFolder);
      }
    }
  }, []);
  return (
    <section className="md:basis-1/4 w-full bg-[#181818]">
      <div className="px-4 py-3 text-white flex flex-col w-full gap-6">
        <header className="grid gap-5 items-center">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">NOWTEDME</h1>
            <Link to={"/"}>
              <TiHome className="text-2xl" />
            </Link>
          </div>
          <button
            className="bg-[#242424] py-3 text-lg font-semibold"
            onClick={() =>
              user?.userIqbal ? navigate("/create-note") : navigate("/Login")
            }
          >
            + New Note
          </button>
        </header>
        {user?.userIqbal ? (
          <>
            <div className="">
              <h1 className="text-xl font-bold text-center">
                Hai {user.userIqbal.displayName}
              </h1>
            </div>
            <button
              className="bg-red-600 py-3 text-lg font-semibold"
              onClick={() => {
                user.signOut();
              }}
            >
              LOGOUT
            </button>
          </>
        ) : (
          <button
            className="bg-[#242424] py-3 text-lg font-semibold"
            onClick={() => navigate("/Login")}
          >
            LOGIN
          </button>
        )}
        <section className="flex flex-col gap-6 justify-center">
          <div className="flex items-center justify-between">
            <h2>Recently</h2>
          </div>
          <div>
            <ul className="w-full grid items-center gap-3 max-h-[120px] overflow-auto parent folder-list">
              {noted.note.length > 0 ? (
                user?.userIqbal ? (
                  noted.note.map((note: Note) => {
                    return (
                      <motion.li
                        className="group"
                        key={note.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "anticipate" }}
                      >
                        <div className="flex items-center gap-4 text-xl cursor-pointer p-2 w-full justify-between">
                          <NavLink
                            to={`/${note.folderName}/${note.id} `}
                            className="flex items-center gap-4"
                          >
                            {location.pathname ===
                            `/${note.folderName}/${note.id}` ? (
                              <TiFolderOpen />
                            ) : (
                              <TiFolder />
                            )}
                            {note.title}
                          </NavLink>
                        </div>
                      </motion.li>
                    );
                  })
                ) : (
                  <div className="w-full grid place-items-center py-4 ">
                    <TiFolder className="text-4xl" />
                    <h4 className="text-lg font-semibold">Create New Notes</h4>
                  </div>
                )
              ) : (
                <div className="w-full grid place-items-center py-4 ">
                  <TiFolder className="text-4xl" />
                  <h4 className="text-lg font-semibold">Create New Notes</h4>
                </div>
              )}
            </ul>
          </div>
        </section>
        <section className="flex flex-col gap-6 justify-center">
          <div className="flex items-center justify-between">
            <h2>Folders</h2>
            <button
              className="text-2xl"
              onClick={() => {
                user?.userIqbal ? handleHideModal() : navigate("/Login");
              }}
            >
              <TiFolderAdd aria-label="add folder" />
            </button>
          </div>
          <div>
            <ul className="w-full grid items-center gap-3 max-h-[120px] overflow-auto parent folder-list">
              {folders?.length > 0 ? (
                user?.userIqbal ? (
                  folders?.map((folder: Folder) => {
                    return (
                      <motion.li
                        className="group"
                        key={folder.idFolder}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "anticipate" }}
                      >
                        <div className="flex items-center gap-4 text-xl cursor-pointer p-2 w-full justify-between">
                          <NavLink
                            to={`/${folder.nameFolder}`}
                            className="flex items-center gap-4"
                          >
                            {location.pathname === `/${folder.nameFolder}` ? (
                              <TiFolderOpen />
                            ) : (
                              <TiFolder />
                            )}
                            {folder.nameFolder.replace(/-/g, " ")}
                          </NavLink>
                          <Link
                            className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out"
                            to={"/"}
                            onClick={() => {
                              const noteList = noted.note.find(
                                (note) => note.folderName === folder.nameFolder
                              );
                              if (noteList) removeNote(noteList?.id);
                              removeFolder(folder.idFolder);
                            }}
                          >
                            <TiTrash />
                          </Link>
                        </div>
                      </motion.li>
                    );
                  })
                ) : (
                  <div className="w-full grid place-items-center py-4 ">
                    <TiFolder className="text-4xl" />
                    <h4 className="text-lg font-semibold">Create New Folder</h4>
                  </div>
                )
              ) : (
                <div className="w-full grid place-items-center py-4 ">
                  <TiFolder className="text-4xl" />
                  <h4 className="text-lg font-semibold">Create New Folder</h4>
                </div>
              )}
            </ul>
          </div>
        </section>
        <section className="flex flex-col gap-6 justify-center">
          <h2>More</h2>
          <div>
            <ul className="w-full grid items-center gap-1">
              <li
                className="flex items-center gap-4 text-xl cursor-pointer p-2 w-full"
                onClick={() => navigate("/Favorite")}
              >
                <TiStarOutline className="text-2xl" />
                Favorite
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Header;
