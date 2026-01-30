import { BadgeCheck } from "lucide-react";
import { TodoProvider } from "./context/TodoContext.jsx";
import { Main } from "./layout/Main.jsx";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 1500);
  }, []);

  return (
    <TodoProvider>
      <div className=" flex flex-col h-svh gap-5 bg-[#F2F0EF] dark:bg-gray-950">
        <AnimatePresence>
          {!pageLoaded && (
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#F2F0EF] dark:bg-gray-950 z-50 w-svw h-svh"
            >
              <BadgeCheck className="absolute my-auto mx-auto inset-0 scale-1000 text-gray-200/10  animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
        <Main />
      </div>
    </TodoProvider>
  );
}

export default App;
