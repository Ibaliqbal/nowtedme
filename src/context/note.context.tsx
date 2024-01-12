import { ReactElement, createContext, useReducer } from "react";

type Note = {
  folderName: string;
  id: number;
  title: string;
  fillNote: string;
};

type StateType = {
  note: Note[];
};

const enum REDUCER_TYPE {
  ADD_NEW_NOTED,
}

type ReducerAction = {
  type: string;
  payload: Note;
};

const initState: StateType = { note: [] };

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case `${REDUCER_TYPE.ADD_NEW_NOTED}`:
      return { note: [...state.note, action.payload] };
    default:
      throw new Error();
      break;
  }
};

const useNotedContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleCreateNoted = (
    folderName: string,
    title: string,
    fillNote: string
  ): void => {
    const id: number =
      state.note.length > 0 ? state.note[state.note.length - 1].id + 1 : 1;
    const newNoted: Note = {
      folderName,
      id,
      title,
      fillNote,
    };
    dispatch({
      type: `${REDUCER_TYPE.ADD_NEW_NOTED}`,
      payload: newNoted,
    });
  };
  return { state, handleCreateNoted };
};

type UseNotedContext = ReturnType<typeof useNotedContext>;

const initContextState: UseNotedContext = {
  state: initState,
  handleCreateNoted: () => {},
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
