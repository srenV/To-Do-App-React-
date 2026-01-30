import { BadgeCheck } from "lucide-react";
import { TodoProvider } from "./context/TodoContext.jsx";
import { Main } from "./layout/Main.jsx";

function App() {
  return (
    <TodoProvider>
      <BadgeCheck className="absolute my-auto mx-auto inset-0 scale-1000 text-gray-200/10"/>
      <div className=" flex flex-col h-svh gap-5 bg-[#F2F0EF] dark:bg-gray-950">
        
        <Main />
      </div>
    </TodoProvider>
  );
}

export default App;
