import { createContext, useReducer, useEffect } from "react";

export const EditorContext = createContext();

export const editorReducer = (state, action) => {
  switch (action.type) {
    case "GET_EDITOR":
      return { ...state, editor: action.payload };
    default:
      return state;
  }
};

export const EditorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, {
    editor: null,
  });

  console.log("EditorContext state:", state);

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};
