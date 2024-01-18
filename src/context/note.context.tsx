import { ReactElement, createContext, useReducer } from "react";
import { Note } from "../type/note.type";
import { toast } from "react-toastify";

type StateType = {
  note: Note[];
};

const enum REDUCER_TYPE {
  ADD_NEW_NOTED,
  REMOVE_NOTED,
  RENDER_NOTED,
  BOOKMARK_NOTED,
  SAVEAS_NOTED,
}

type ReducerAction = {
  type: string;
  payload: Note[];
};

const initState: StateType = { note: [] };

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case `${REDUCER_TYPE.ADD_NEW_NOTED}`:
      return { note: [...action.payload, ...state.note] };
    case `${REDUCER_TYPE.RENDER_NOTED}`:
      return { note: [...action.payload] };
    case `${REDUCER_TYPE.REMOVE_NOTED}`:
      if (state.note.length === 1) {
        localStorage.removeItem("notes");
      }
      return { note: [...action.payload] };
    case `${REDUCER_TYPE.BOOKMARK_NOTED}`:
      return { note: [...action.payload] };
    default:
      throw new Error();
  }
};

const useNotedContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleCreateNoted = (
    folderName: string,
    title: string,
    fillNote: string,
    year: number,
    month: number,
    date: number
  ): void => {
    const id: number = state.note.length > 0 ? state.note[0].id + 1 : 1;
    const nameFolder = folderName ? folderName : "No-Folder";
    const newNoted: Note[] = [
      {
        folderName: nameFolder,
        id,
        title,
        fillNote,
        year,
        month,
        date,
        bookmark: false,
      },
    ];
    toast.success("Successfuly create note");
    dispatch({
      type: `${REDUCER_TYPE.ADD_NEW_NOTED}`,
      payload: newNoted,
    });
  };

  const renderNotes = (notes: Note[]) => {
    dispatch({
      type: `${REDUCER_TYPE.RENDER_NOTED}`,
      payload: notes,
    });
  };

  const removeNote = (id: number): void => {
    const notesFilter = state.note.filter((list) => list.id !== id);
    toast.error("Succesfuly delete note");
    dispatch({
      type: `${REDUCER_TYPE.REMOVE_NOTED}`,
      payload: notesFilter,
    });
  };
  const bookmarkNote = (id: number): void => {
    const newBookMark = state.note.map((obj) => {
      if (obj.id === id) {
        return { ...obj, bookmark: !obj.bookmark };
      } else {
        return obj;
      }
    });
    console.log("newBookMark", newBookMark);
    dispatch({
      type: `${REDUCER_TYPE.BOOKMARK_NOTED}`,
      payload: newBookMark,
    });
  };
  const saveasNote = (title: string, fil: string, id: number): void => {
    // const newBookMark = state.note.map((obj) => {
    //   if (obj.id === id) {
    //     return { ...obj, bookmark: !obj.bookmark };
    //   } else {
    //     return obj;
    //   }
    // });
    // console.log("newBookMark", newBookMark);
    // dispatch({
    //   type: `${REDUCER_TYPE.BOOKMARK_NOTED}`,
    //   payload: newBookMark,
    // });
  };
  return {
    state,
    handleCreateNoted,
    renderNotes,
    removeNote,
    bookmarkNote,
    saveasNote,
  };
};

type UseNotedContext = ReturnType<typeof useNotedContext>;

const initContextState: UseNotedContext = {
  state: initState,
  handleCreateNoted: () => {},
  renderNotes: () => {},
  removeNote: () => {},
  bookmarkNote: () => {},
  saveasNote: () => {},
};

export const NotedContext = createContext<UseNotedContext>(initContextState);

type NotedProviderProps = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const NotedProvider = ({
  children,
}: NotedProviderProps): ReactElement => {
  return (
    <NotedContext.Provider value={useNotedContext(initState)}>
      {children}
    </NotedContext.Provider>
  );
};
