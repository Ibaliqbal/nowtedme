import Noted from "../components/Noted";
import ListNoted from "../components/ListNoted";
import Header from "../components/Header";
import ModalSaveAsNote from "../features/Noted/ModalSaveAsNote";
import ModalFolder from "../features/Folder/ModalFolder";

type HomeProps = {
  isOpen: boolean;
  handleHideModalFolder: () => void;
};

const Notes = ({ isOpen, handleHideModalFolder }: HomeProps) => {
  return (
    <main className="max-w-[90rem] mx-auto relative bg-blue-500 flex flex-row h-screen max-h-[100dvh] flex-wrap">
      {isOpen ? <ModalFolder handleHideModal={handleHideModalFolder} /> : null}

      <Header handleHideModal={handleHideModalFolder} />
      <ListNoted />
      <Noted />
    </main>
  );
};

export default Notes;
