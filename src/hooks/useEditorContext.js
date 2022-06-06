import { EditorContext } from "../context/EditorContext";
import { useContext } from "react";

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw Error("useEditorContext must be used inside an AuthContextProvider");
  }

  return context;
};
