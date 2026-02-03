import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [text, setText] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [editBool, setEditBool] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [restored, setRestored] = useState(false);
  const [list, setList] = useState(() => {
    try {
      //try to retrieve data from LS, if there is no Data we return an empty array
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

  //calculates filtered list based on filterValue - recalculates only when list or filterValue changes
  const filtered = useMemo(() => {
    switch (filterValue) {
      case "all":
        return list.filter((item) => !item.softDel);
      case "checked":
        return list.filter((item) => item.checked && !item.softDel);
      case "deleted":
        return list.filter((item) => item.softDel);
      default:
        return list;
    }
  }, [list, filterValue]);

  //Just to pass the selected value to setFilterValue
  function handleFilter(value) {
    setFilterValue(value);
  }

  function handleAdd(text) {
    //defensive statement to prevent empty entries
    if (!text) return;
    //creates a copy of the list with the spread operator, then adds a new entry
    // list entries consist of:
    // - id - (represented by the timestamp of creation),
    // - text - (the value entered by the user),
    // - checked - (a boolean to keep track of completed todo's)
    setList([
      ...list,
      { id: Date.now(), text: text, checked: false, softDel: false },
    ]);
    setText("");

    //trigger visual feedback for entry creation
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 1250);
  }

  function handleEdit(e, id, newText) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //prevents empty list entries
    if (newText === "") return;
    // handle Enter key press
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur(); // trigger the blur event on the entry to save it if the enter key is pressed
      setList(
        list.map((listItem) =>
          listItem.id === id ? { ...listItem, text: newText } : listItem,
        ),
      );
      setEditBool(false);
    }
    // handle blur event (when clicking outside or after Enter)
    // the blur event is called if the entry gets out of focus by typing tab, enter or clicking outside of it
    else if (e.type === "blur") {
      setList(
        list.map((listItem) =>
          listItem.id === id ? { ...listItem, text: newText } : listItem,
        ),
      );
      setEditBool(false);
    }
  }

  //handles soft and hard deletions
  function handleDelete(id) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    const item = list.find((itm) => itm.id === id);
    //first perform a soft delete, if softDel is already true and the function gets called again delete the entry completely
    if (item && item.softDel === false) {
      setList(
        list.map((itm) => (itm.id === id ? { ...itm, softDel: true } : itm)),
      );
    } else {
      //checks each entry in list, returns a copy of the array without the searched id
      setList(list.filter((item) => item.id !== id));
    }
    //trigger visual feedback for entry deletion
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 1250);
  }

  //handles a restore functionality to bring back soft deleted entries
  function handleRestore(id) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //maps through the list and set softDel back to false
    setList(
      list.map((itm) => (itm.id === id ? { ...itm, softDel: false } : itm)),
    );
    //trigger visual feedback for entry restore
    setRestored(true);
    setTimeout(() => {
      setRestored(false);
    }, 1250);
  }

  function handleDeleteChecked() {
    //checks each entry in list, filters out checked entries
    //completely deletes the entry if the current filter is set to deleted otherwise perform a soft delete
    if (filterValue === "deleted") {
      //hard delete
      setList(list.filter((item) => item.id && item.checked !== true));
    } else {
      //soft delete
      setList(
        list.map((itm) => (itm.checked ? { ...itm, softDel: true } : itm)),
      );
    }
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 1250);
  }

  function handleChecked(id) {
    //defensive statement to ensure stability
    if (id === undefined || id === null) return;
    //maps through every entry in list and searches for the matching id
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
    handleRestore,
    created,
    deleted,
    restored,
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
