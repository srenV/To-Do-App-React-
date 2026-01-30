import React from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import TodoContext, { useTodoContext } from "../context/TodoContext";
import { Badge, BadgeCheck, DiamondPlus, Github, Linkedin, Trash2, TrashIcon, Upload } from "lucide-react";

export const Main = () => {
  const { text, setText, handleAdd, handleDelete, handleChecked, list, handleFilter, filtered, handleDeleteChecked, handleKeyDown } =
    useTodoContext();


  return (
    <main className="w-full pt-2 flex flex-col items-center gap-5 h-svh dark:text-gray-300">
      <div className="flex md:px-5 justify-between text-xs md:text-lg w-full font-semibold">
        <div className="flex gap-5 flex-row ">
          <a href="https://github.com/srenV"><Github/></a>
          <a href="https://www.linkedin.com/in/soren-timo-voigt/"><Linkedin/></a>
        </div>
        <div></div>
        <div className="flex gap-5 flex-row">
          <a href="https://srenv.vercel.app/impressum" target="_blank">
            Impressum
          </a>
          <a
            className="text-nowrap"
            href="https://srenv.vercel.app/legal"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <div className=" h-full w-full md:w-9/10 p-2 md:p-5 rounded-2xl flex flex-col-reverse items-center gap-5 md:gap-10 overflow-y-scroll ">
        <form
          className={`${list < 1 ? "md:-translate-y-[50svh] w-full md:w-200" : "md:translate-y-0 w-full"} 
          transition-all ease-in-out duration-500 flex flex-col gap-2 md:gap-5 z-10 justify-center items-center
           bg-gray-200 dark:bg-gray-800  p-2 md:p-10 rounded-lg md:rounded-4xl shadow-lg border-b-4 border-gray-300 dark:border-gray-700`}
          action=""
          onSubmit={(e) => {
            (e.preventDefault(), handleAdd(text));
          }}
        >
          <textarea
            type="text"
            placeholder="Do something!"
            value={text}
            onKeyDown={handleKeyDown}
            spellCheck
            rows={1}
            onChange={(e) => setText(e.target.value)}
            className=" p-2 text-lg md:text-2xl rounded-3xl w-full placeholder:font-bold placeholder:font-mono resize-none field-sizing-content outline-none"
          />

          <div className="items-center flex gap-10 w-full justify-between">
            <button onClick={() => handleDeleteChecked()}><TrashIcon/></button>
            <div className="items-center flex gap-10 ">
              <select
                name="filter"
                id="filter"
                className="text-end hover:dark:bg-gray-600 hover:rounded-md p-0.5"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="checked">Checked</option>
                <option value="deleted">Deleted</option>
              </select>
              <button type="submit" className="">
                <DiamondPlus className="scale-130" />
              </button>
            </div>
          </div>
        </form>
        <ul className=" w-full flex flex-col gap-2 ">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                className="p-2 md:p-3 border rounded-lg shadow-xl dark:bg-gray-700 dark:border-gray-600"
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.7, type: spring, bounce: 0.3, delay:0.4}}
                
              >
                <li className="flex justify-between ">
                  <div className="flex items-center gap-5">
                    <button
                      className={``}
                      onClick={() => handleChecked(item.id)}
                    >
                      {item.checked ? (
                        <BadgeCheck className="fill-green-300 dark:fill-green-700 scale-130" />
                      ) : (
                        <Badge className="scale-130" />
                      )}
                    </button>
                    <p>{item.text}</p>
                  </div>
                  <button className="" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="scale-130" />
                  </button>
                </li>
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </main>
  );
};
