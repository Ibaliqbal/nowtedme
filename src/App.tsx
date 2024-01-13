import Header from "./components/Header";
import ListNoted from "./components/ListNoted";
import Noted from "./components/Noted";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestReactQuill from "./components/TestReactQuill";
import { useState } from "react";
import ModalNote from "./components/ModalFolder";
import { FolderProvider } from "./context/folder.context";
import { NotedProvider } from "./context/note.context";
import ModalNoted from "./features/Noted/ModalNoted";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Notes";
import Note from "./pages/Notes";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalNoted, setIsOpenModalNoted] = useState<boolean>(false);
  const handleHideModalFolder = (): void => {
    setIsOpen((prev) => !prev);
  };
  const handleHideModalNoted = (): void => {
    setIsOpenModalNoted((prev) => !prev);
  };

  return (
    <>
      <FolderProvider>
        <NotedProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Note
                  isOpen={isOpen}
                  isOpenModalNoted={isOpenModalNoted}
                  handleHideModalFolder={handleHideModalFolder}
                  handleHideModalNoted={handleHideModalNoted}
                />
              }
            />
            <Route
              path=":folder"
              element={
                <Note
                  isOpen={isOpen}
                  isOpenModalNoted={isOpenModalNoted}
                  handleHideModalFolder={handleHideModalFolder}
                  handleHideModalNoted={handleHideModalNoted}
                />
              }
            >
              <Route
                path=":note"
                element={
                  <Note
                    isOpen={isOpen}
                    isOpenModalNoted={isOpenModalNoted}
                    handleHideModalFolder={handleHideModalFolder}
                    handleHideModalNoted={handleHideModalNoted}
                  />
                }
              />
            </Route>
            <Route
              path="/create-note"
              element={
                <Note
                  isOpen={isOpen}
                  isOpenModalNoted={isOpenModalNoted}
                  handleHideModalFolder={handleHideModalFolder}
                  handleHideModalNoted={handleHideModalNoted}
                />
              }
            />
          </Routes>
        </NotedProvider>
      </FolderProvider>
    </>
  );
}

export default App;
