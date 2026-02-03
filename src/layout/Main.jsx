import React from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useTodoContext } from "../context/TodoContext";
import { BadgeCheck } from "lucide-react";
import { Header } from "./Header.jsx";
import { Form } from "../components/Form.jsx";
import { ListItem } from "../components/ListItem.jsx";

export const Main = () => {
  const { filtered } = useTodoContext();

  return (
    <main className="w-full pt-2 flex flex-col items-center gap-5 h-svh dark:text-gray-500">
      <BadgeCheck className="absolute my-auto mx-auto inset-0 scale-1000 text-gray-200/10" />
      <Header />
      <div className=" h-full w-full md:w-9/10 p-2 md:p-5 rounded-2xl flex flex-col-reverse items-center gap-5 md:gap-10 overflow-y-scroll ">
        <Form />
        <ul className=" w-full flex flex-col gap-2 ">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                className="p-2 md:p-3 border rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{
                  duration: 0.7,
                  type: spring,
                  bounce: 0.3,
                  delay: 0.4,
                }}
              >
                <ListItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </main>
  );
};
