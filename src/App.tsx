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

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalNoted, setIsOpenModalNoted] = useState<boolean>(false);
  const handleHideModalFolder = (): void => {
    setIsOpen((prev) => !prev);
  };
  const handleHideModalNoted = (): void => {
    setIsOpenModalNoted((prev) => !prev);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main className="max-w-[90rem] mx-auto relative bg-blue-500 flex flex-row h-screen max-h-screen">
          {isOpen ? (
            <ModalNote
              handleHideModal={handleHideModalFolder}
              isOpen={isOpen}
            />
          ) : null}
          {isOpenModalNoted ? (
            <ModalNoted
              handleHideModal={handleHideModalNoted}
              isOpen={isOpenModalNoted}
            />
          ) : null}
          <Header
            handleHideModal={handleHideModalFolder}
            handleHideModalNoted={handleHideModalNoted}
          />
          <ListNoted />
          <Noted />
        </main>
      ),
    },
    // {
    //   path: "/testreactquill",
    //   element: <TestReactQuill />,
    // },
  ]);

  return (
    <>
      <FolderProvider>
        <NotedProvider>
          <RouterProvider router={router} />
        </NotedProvider>
      </FolderProvider>
    </>
  );
}

export default App;
