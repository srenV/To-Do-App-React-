import React from "react";
import { motion } from "framer-motion";
import { Badge, BadgeCheck, Trash2 } from "lucide-react";
import { useTodoContext } from "../context/TodoContext";

export const ListItem = ({ item }) => {
  const { handleDelete, handleChecked, handleEdit, editBool, setEditBool } =
    useTodoContext();

  return (
    <li className="flex justify-between gap-5">
      <div className="flex items-center gap-5 w-full">
        <motion.button
          whileTap={{ y: -5, scale: 1.2 }}
          className={``}
          onClick={() => handleChecked(item.id)}
        >
          {item.checked ? (
            <BadgeCheck className="fill-green-300 dark:fill-green-700 scale-130" />
          ) : (
            <Badge className="scale-130" />
          )}
        </motion.button>
        <p
          className={`text-gray-300 w-full md:p-1 rounded-lg ${editBool && "outline-2 outline-amber-300"}`}
          contentEditable={editBool}
          suppressContentEditableWarning
          onClick={() => setEditBool(true)}
          onKeyDown={(e) => handleEdit(e, item.id, e.currentTarget.textContent)}
          onBlur={(e) => handleEdit(e, item.id, e.currentTarget.textContent)}
        >
          {item.text}
        </p>
      </div>
      <div className="flex gap-5 items-center ">
        <motion.button
          className=""
          onClick={() => handleDelete(item.id)}
          whileTap={{ y: -5, scale: 1.2 }}
        >
          <Trash2 className="scale-130" />
        </motion.button>
      </div>
    </li>
  );
};
