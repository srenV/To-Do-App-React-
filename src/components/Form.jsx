import React from "react";
import { motion } from "framer-motion";
import { DiamondPlus, TrashIcon } from "lucide-react";
import { useTodoContext } from "../context/TodoContext";

export const Form = () => {
  const {
    text,
    setText,
    handleAdd,
    list,
    handleFilter,
    handleDeleteChecked,
    handleKeyDown,
    created,
    deleted, 
    restored
  } = useTodoContext();

  return (
    <form
      className={`${list < 1 ? "md:-translate-y-[41svh] y-auto w-full md:w-200" : "md:translate-y-0 w-full"} 
          transition-all ease-in-out duration-500 flex flex-col gap-2 md:gap-5 z-10 justify-center items-center
           bg-gray-200 dark:bg-gray-800/80  p-2 md:p-10 rounded-lg md:rounded-4xl shadow-xs border-b-4 border-gray-300 dark:border-gray-700
           ${restored && "dark:border-yellow-400/75 border-yellow-400/75 shadow-yellow-500 "} 
           ${deleted && "dark:border-red-400/75 border-red-400/75 shadow-red-500 "} 
           ${created && "dark:border-green-400/75 border-green-400/75 shadow-green-600 "}`}
      action=""
      onSubmit={(e) => {
        (e.preventDefault(), handleAdd(text));
      }}
    >
      <textarea
        type="text"
        placeholder="Remind me to..."
        value={text}
        onKeyDown={handleKeyDown}
        spellCheck
        rows={1}
        onChange={(e) => setText(e.target.value)}
        className=" p-2 text-lg md:text-2xl rounded-3xl w-full placeholder:font-bold placeholder:font-mono resize-none field-sizing-content outline-none"
      />

      <div className="items-center flex gap-5 px-2 md:px-0 md:gap-10 w-full justify-between">
        <button
          onClick={() => handleDeleteChecked()}
          className="flex items-center gap-3 font-bold"
        >
          <TrashIcon /> Delete selected
        </button>
        <div className="items-center flex gap-3 md:gap-10 ">
          <select
            name="filter"
            id="filter"
            className="text-end md:hover:dark:bg-gray-600 open:bg-gray-600 hover:rounded-md open:rounded-md p-0.5"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="checked">Done</option>
            <option value="deleted">Deleted</option>
          </select>
          <motion.button
            type="submit"
            className=""
            whileTap={{ rotate: 90 }}
            whileHover={{ scale: 1.1 }}
          >
            <DiamondPlus className="scale-130" />
          </motion.button>
        </div>
      </div>
    </form>
  );
};
