import EmptyNoted from "./EmptyNoted";
import SelectedNoted from "./SelectedNoted";
import { useLocation, useParams } from "react-router-dom";

const Noted = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <section className="md:basis-1/2 bg-secondary">
      {location.pathname ===
      `/${decodeURIComponent(params.folder ?? "")}/${params.note}` ? (
        <SelectedNoted idNoted={params.note} />
      ) : location.pathname === "/create-note" ||
        location.pathname === `${decodeURIComponent(params.folder ?? "")}` ? (
        <SelectedNoted />
      ) : (
        <EmptyNoted />
      )}
    </section>
  );
};

export default Noted;
