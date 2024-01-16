import React from "react";
import Noted from "../components/Noted";
import ListNoted from "../components/ListNoted";
import Header from "../components/Header";
import ModalNoted from "../features/Noted/ModalNoted";
import ModalNote from "../features/Folder/ModalFolder";

type HomeProps = {
  isOpen: boolean;
  isOpenModalNoted: boolean;
  handleHideModalFolder: () => void;
  handleHideModalNoted: () => void;
};

const Note = ({
  isOpen,
  isOpenModalNoted,
  handleHideModalFolder,
  handleHideModalNoted,
}: HomeProps) => {
  return (
    <main className="max-w-[90rem] mx-auto relative bg-blue-500 flex flex-row h-screen max-h-screen">
      {isOpen ? (
        <ModalNote handleHideModal={handleHideModalFolder} isOpen={isOpen} />
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
  );
};

export default Note;
