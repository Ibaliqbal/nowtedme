import Noted from "../components/Noted";
import ListNoted from "../components/ListNoted";
import Header from "../components/Header";
import ModalFolder from "../features/Folder/ModalFolder";

type HomeProps = {
  isOpen: boolean;
  handleHideModalFolder: () => void;
};

const Notes = ({ isOpen, handleHideModalFolder }: HomeProps) => {
  return (
    <main className="max-w-[90rem] mx-auto relative flex lg:flex-row h-screen max-h-[100dvh] flex-col">
      {isOpen ? <ModalFolder handleHideModal={handleHideModalFolder} /> : null}
      <Header handleHideModal={handleHideModalFolder} />
      <ListNoted />
      <Noted />
    </main>
  );
};

export default Notes;
