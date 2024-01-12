import React from "react";
import EmptyNoted from "./EmptyNoted";
import SelectedNoted from "./SelectedNoted";

const Noted = () => {
  return (
    <section className="md:basis-1/2 bg-[#181818]">
      {/* <EmptyNoted /> */}
      <SelectedNoted />
    </section>
  );
};

export default Noted;
