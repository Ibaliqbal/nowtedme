import { ReactElement, createContext, useReducer } from "react";
import { Note } from "../type/note.type";

type StateType = {
  note: Note[];
};

const enum REDUCER_TYPE {
  ADD_NEW_NOTED,
  REMOVE_NOTED,
  RENDER_NOTED,
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
    const nameFolder = folderName ? folderName : "NoFolder";
    const newNoted: Note[] = [
      {
        folderName: nameFolder,
        id,
        title,
        fillNote,
        year,
        month,
        date,
      },
    ];
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
    dispatch({
      type: `${REDUCER_TYPE.REMOVE_NOTED}`,
      payload: notesFilter,
    });
  };
  return { state, handleCreateNoted, renderNotes, removeNote };
};

type UseNotedContext = ReturnType<typeof useNotedContext>;

const initContextState: UseNotedContext = {
  state: initState,
  handleCreateNoted: () => {},
  renderNotes: () => {},
  removeNote: () => {},
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
