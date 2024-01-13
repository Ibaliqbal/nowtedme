import React, { useContext, useEffect, useState } from "react";
import {
  TiFolderAdd,
  TiFolder,
  TiFolderOpen,
  TiStarOutline,
  TiTrash,
} from "react-icons/ti";
import { FolderContext } from "../context/folder.context";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Folder } from "../type/folder.type";

type HeaderProps = {
  handleHideModal: () => void;
  handleHideModalNoted: () => void;
};

const Header = ({ handleHideModal, handleHideModalNoted }: HeaderProps) => {
  const { state, removeFolder, renderFolder } = useContext(FolderContext);
  const [folders, setFolders] = useState<Folder[]>([]);
  const navigate = useNavigate()
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
          <div>
            <h1 className="font-bold text-xl">NOWTEDME</h1>
          </div>
          <button
            className="bg-[#242424] py-3 text-lg font-semibold"
            onClick={() => navigate("/create-note")}
          >
            + New Note
          </button>
        </header>
        <button className="bg-[#242424] py-3 text-lg font-semibold">
          LOGIN
        </button>
        <section className="flex flex-col gap-6 justify-center">
          <div className="flex items-center justify-between">
            <h2>Folders</h2>
            <button className="text-2xl" onClick={handleHideModal}>
              <TiFolderAdd aria-label="add folder" />
            </button>
          </div>
          <div>
            <ul className="w-full grid items-center gap-3 max-h-[400px] overflow-auto parent folder-list">
              {folders?.length > 0 ? (
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
                          {folder.nameFolder}
                        </NavLink>
                        <Link
                          className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out"
                          to={"/"}
                          onClick={() => {
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
              )}
            </ul>
          </div>
        </section>
        <section className="flex flex-col gap-6 justify-center">
          <h2>More</h2>
          <div>
            <ul className="w-full grid items-center gap-1">
              <li className="flex items-center gap-4 text-xl cursor-pointer p-2 w-full">
                <TiStarOutline className="text-2xl" />
                Favorite
              </li>
              <li className="flex items-center gap-4 text-xl cursor-pointer p-2 w-full">
                <TiTrash className="text-2xl" />
                Trash
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Header;
