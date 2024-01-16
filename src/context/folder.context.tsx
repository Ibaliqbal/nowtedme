import { ReactElement, createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "../type/folder.type";

type StateType = {
  folder: Folder[];
};

type ReducerAction = {
  type: string;
  payload: Folder[];
};

const enum REDUCER_TYPE {
  ADD_NEW_FOLDER,
  REMOVE_FOLDER,
  RENDER_FOLDER,
}

const initState: StateType = { folder: [] };

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case `${REDUCER_TYPE.ADD_NEW_FOLDER}`:
      return { folder: [...action.payload, ...state.folder] };
    case `${REDUCER_TYPE.REMOVE_FOLDER}`:
      const removeFolderId = action.payload;
      const filterFolder = state.folder.filter(
        (folder) => folder.idFolder !== removeFolderId[0].idFolder
      );
      if (state.folder.length === 1) {
        localStorage.removeItem("folders");
      }
      return { folder: [...filterFolder] };
    case `${REDUCER_TYPE.RENDER_FOLDER}`:
      return { folder: [...action.payload] };
    default:
      throw new Error();
  }
};

const useFolderContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const navigate = useNavigate();

  const handleCreateFolder = (nameFolder: string) => {
    const id: number = state.folder.length ? state.folder[0].idFolder + 1 : 1;
    const folderName = nameFolder.replace(/ /g, '-');
    const folder: Folder[] = [
      {
        idFolder: id,
        nameFolder: folderName,
      },
    ];
    dispatch({
      type: `${REDUCER_TYPE.ADD_NEW_FOLDER}`,
      payload: folder,
    });
  };

  const removeFolder = (idFolder: number): void => {
    const filterFolder = state.folder.filter(
      (folder) => folder.idFolder === idFolder
    );
    dispatch({
      type: `${REDUCER_TYPE.REMOVE_FOLDER}`,
      payload: filterFolder,
    });
  };

  const renderFolder = (folders: Folder[]): void => {
    navigate("/");
    dispatch({
      type: `${REDUCER_TYPE.RENDER_FOLDER}`,
      payload: folders,
    });
  };
  return { state, handleCreateFolder, removeFolder, renderFolder };
};

type UseFolderContext = ReturnType<typeof useFolderContext>;

const initContextState: UseFolderContext = {
  state: initState,
  handleCreateFolder: () => {},
  removeFolder: () => {},
  renderFolder: () => {},
};

export const FolderContext = createContext<UseFolderContext>(initContextState);

type FolderProviderProps = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const FolderProvider = ({
  children,
}: FolderProviderProps): ReactElement => {
  return (
    <FolderContext.Provider value={useFolderContext(initState)}>
      {children}
    </FolderContext.Provider>
  );
};
