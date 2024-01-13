import { ReactElement, createContext, useReducer } from "react";
import { Note } from "../type/note.type";

type StateType = {
  note: Note[];
};

const enum REDUCER_TYPE {
  ADD_NEW_NOTED,
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
      return { note: [...state.note, ...action.payload] };
    case `${REDUCER_TYPE.RENDER_NOTED}`:
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
    const id: number =
      state.note.length > 0 ? state.note[state.note.length - 1].id + 1 : 1;
    const nameFolder = folderName ? folderName : "No Folder";
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
  return { state, handleCreateNoted, renderNotes };
};

type UseNotedContext = ReturnType<typeof useNotedContext>;

const initContextState: UseNotedContext = {
  state: initState,
  handleCreateNoted: () => {},
  renderNotes: () => {}
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
