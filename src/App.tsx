import { useState } from "react";
import { FolderProvider } from "./context/folder.context";
import { NotedProvider } from "./context/note.context";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { AuthProvider } from "./context/auth.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleHideModalFolder = (): void => {
    setIsOpen((prev) => !prev);
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
                  <Notes
                    isOpen={isOpen}
                    handleHideModalFolder={handleHideModalFolder}
                  />
                }
              />
              <Route path="/Login" element={<Login />} />
              <Route
                path=":folder"
                element={
                  <Notes
                    isOpen={isOpen}
                    handleHideModalFolder={handleHideModalFolder}
                  />
                }
              >
                <Route
                  path=":note"
                  element={
                    <Notes
                      isOpen={isOpen}
                      handleHideModalFolder={handleHideModalFolder}
                    />
                  }
                />
              </Route>
              <Route
                path="/create-note"
                element={
                  <Notes
                    isOpen={isOpen}
                    handleHideModalFolder={handleHideModalFolder}
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
