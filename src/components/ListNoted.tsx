import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NotedContext } from "../context/note.context";
import { Link, useLocation, useParams } from "react-router-dom";
import { Note } from "../type/note.type";
import { AuthContext } from "../context/auth.context";
import { FaRegFileAlt } from "react-icons/fa";

const ListNoted = () => {
  const { state, renderNotes } = useContext(NotedContext);
  const user = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    if (params.folder) {
      if (params.folder === "Favorite") {
        const filterByFavorite = state.note.filter((note) => note.bookmark);
        setNotes(filterByFavorite);
      } else {
        const filterByFolder = state.note.filter(
          (note) => note.folderName === params.folder
        );
        setNotes(filterByFolder);
      }
    } else {
      const filterByFolder = state.note.filter(
        (note) => note.folderName === "NoFolder"
      );
      setNotes(filterByFolder);
    }
  }, [state.note]);
  useEffect(() => {
    if (params.folder) {
      if (params.folder === "Favorite") {
        const filterByFavorite = state.note.filter((note) => note.bookmark);
        setNotes(filterByFavorite);
      } else {
        const filterByFolder = state.note.filter(
          (note) => note.folderName === params.folder
        );
        setNotes(filterByFolder);
      }
    } else {
      const filterByFolder = state.note.filter(
        (note) => note.folderName === "NoFolder"
      );
      setNotes(filterByFolder);
    }
  }, [params.folder]);
  useEffect(() => {
    if (notes?.length) {
      localStorage.setItem("notes", JSON.stringify(state.note));
    }
  }, [notes]);
  useEffect(() => {
    const note = localStorage.getItem("notes");
    if (user?.userIqbal) {
      console.log("login first");
    } else {
      if (note) {
        const parseNote = JSON.parse(note) as Note[];
        if (parseNote.length) {
          const filterByFolder = state.note.filter(
            (note) => note.folderName === "NoFolder"
          );
          setNotes(filterByFolder);
          renderNotes(parseNote);
        }
      }
    }
  }, []);

  return (
    <section className="md:basis-1/4 bg-[#1C1C1C] max-h-screen w-full overflow-auto parent">
      <div className="py-3 px-4 grid items-center text-white gap-3">
        {location.pathname === `/${params.folder}` ||
        location.pathname === `/${params.folder}/${params.note}` ? (
          <>
            <h1 className="font-semibold text-2xl">
              {params.folder?.replace(/-/g, " ")}
            </h1>
            <ul className="grid gap-6 items-center pb-3">
              {notes.length > 0 ? (
                user?.userIqbal ? (
                  notes.map((note) => {
                    return (
                      <Link to={`/${note.folderName}/${note.id}`} key={note.id}>
                        <motion.li
                          className="bg-note p-3 rounded-md cursor-pointer"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, ease: "backInOut" }}
                        >
                          <h2 className="text-xl font-semibold">
                            {note.title}
                          </h2>
                          <p className="mt-3">{`${note.year}/${note.date}/${
                            note.month + 1
                          }`}</p>
                        </motion.li>
                      </Link>
                    );
                  })
                ) : null
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center gap-4">
                  <FaRegFileAlt className="text-4xl md:text-6xl"/>
                  <h3 className="font-semibold text-xl">Create new note</h3>
                </div>
              )}
            </ul>
          </>
        ) : (
          <>
            <h1 className="font-semibold text-2xl">No Folder</h1>
            <div></div>
            <ul className="grid gap-6 items-center pb-3">
              {notes.length > 0
                ? user?.userIqbal
                  ? notes.map((note) => {
                      return (
                        <Link
                          to={`/${note.folderName}/${note.id}`}
                          key={note.id}
                        >
                          <motion.li
                            className="bg-note p-3 rounded-md"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "backInOut" }}
                          >
                            <h2 className="text-xl font-semibold">
                              {note.title}
                            </h2>
                            <p className="mt-3">{`${note.year}/${note.date}/${
                              note.month + 1
                            }`}</p>
                          </motion.li>
                        </Link>
                      );
                    })
                  : null
                : null}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default ListNoted;
