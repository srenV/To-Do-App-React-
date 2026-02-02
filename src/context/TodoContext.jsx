import React, { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [editBool, setEditBool] = useState(false);
  const [list, setList] = useState(() => {
    try {
      //try to retrieve data from LS, if there is not Data we return a empty array
      const saved = localStorage.getItem("Notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  //executes every time when list changes
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(list));
  }, [list]);

  //executes every time when list or filterValue changes
  useEffect(() => {
    //to show all entrys
    if (filterValue === "all") {
      setFiltered(list);
    } else {
      //sets filterValue to the selected value and filters the entrys with it
      const targetChecked = filterValue === "checked";
      setFiltered(list.filter((item) => item.checked === targetChecked));
    }
  }, [list, filterValue]);

  //Just to pass the selected value to setFilterValue
  function handleFilter(value) {
    setFilterValue(value);
  }

  function handleAdd(text) {
    //defensive statement to prevent empty entrys
    if (!text) return;
    //creates a copy of the list with the spread operator, then adds a new entry
    // list entrys consists of:
    // - id - (represented by the timestamp of creation),
    // - text - (the value entered by the user),
    // - checked - (a boolean to keep track of completed todo's)
    setList([...list, { id: Date.now(), text: text, checked: false }]);
    setText("");
  }

  function handleEdit(e, id, newText) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //prevents empty list entrys
    if (newText === "") return;
    // handle Enter key press
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur(); // set the blur event on the entry to save it if the enter key is pressed
      setList(list.map((listItem) =>listItem.id === id ? { ...listItem, text: newText } : listItem,),);
      setEditBool(false);
    }
    // handle blur event (when clicking outside or after Enter)
    // the blur event is called if the entry gets out of focus by tipping tab, enter or clicking outside of it
    else if (e.type === "blur") {
      setList(list.map((listItem) =>listItem.id === id ? { ...listItem, text: newText } : listItem,),);
      setEditBool(false);
    }
  }

  function handleDelete(id) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //checks each entry in list, returns a copy of the array without the searched id
    setList(list.filter((item) => item.id !== id));
  }

  function handleDeleteChecked() {
    //checks each entry in list, returns a copy of the array with only unchecked entrys
    setList(list.filter((item) => item.id && item.checked !== true));
  }

  function handleChecked(id) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //maps through every entry in list and seaches fort the matching id
    //then just reverse its boolean value
    setList(
      list.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  // helper to listen to the keystrokes inside of the textarea
  // submits if the pressed key is enter
  // shift + enter still works to perform a line break
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  }

  //helper for enhanced readability in the context-provider
  const value = {
    text,
    setText,
    handleAdd,
    list,
    setList,
    handleDelete,
    handleChecked,
    handleFilter,
    filtered,
    filterValue,
    handleDeleteChecked,
    handleKeyDown,
    handleEdit,
    editBool,
    setEditBool,
  };

  //returns the provider with all the given values to make the data accessible through the entire app
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useFormContext must be used within a FormProvider");
  return context;
}

export default TodoContext;
