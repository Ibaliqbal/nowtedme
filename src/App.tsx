import { useState } from "react";
import { FolderProvider } from "./context/folder.context";
import { NotedProvider } from "./context/note.context";
import { Routes, Route } from "react-router-dom";
import Note from "./pages/Notes";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <AuthProvider>
        <FolderProvider>
          <NotedProvider>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="dark"
            />
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
              <Route path="/Login" element={<Login />} />
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
      </AuthProvider>
    </>
  );
}

export default App;
