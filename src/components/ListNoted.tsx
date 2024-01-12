import React from "react";
import { motion } from "framer-motion";

const ListNoted = () => {
  return (
    <section className="md:basis-1/4 bg-[#1C1C1C] max-h-screen overflow-auto parent">
      <div className="py-3 px-4 grid items-center text-white gap-3">
        <h1 className="font-semibold text-2xl">Personal</h1>
        <ul className="grid gap-6 items-center pb-3">
          {[...Array(10).keys()].map((_, i) => {
            return (
              <motion.li
                key={i}
                className="bg-[#313131] p-3 rounded-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "backInOut" }}
              >
                <h2 className="text-xl font-semibold">My Goals Next Year</h2>
                <p className="mt-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Atque cupiditate dolorem maiores hic? Molestias temporibus
                  provident, non veritatis voluptate iusto.
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ListNoted;
