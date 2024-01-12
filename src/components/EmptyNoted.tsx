import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

const EmptyNoted = () => {
  return (
    <section className="w-full h-full flex items-center justify-center text-white">
      <div className="p-6 flex flex-col items-center gap-3 max-w-[600px]">
        <FaRegFileAlt className="text-9xl" />
        <h1 className="text-3xl">Select a note to view</h1>
        <p className="text-center text-lg">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </section>
  );
};

export default EmptyNoted;
