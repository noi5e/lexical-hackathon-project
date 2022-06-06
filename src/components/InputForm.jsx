import { useState, useEffect } from "react";
import {
  $getRoot,
  $getSelection,
  $createParagraphNode,
  $wrapLeafNodesInElements,
  $isRangeSelection,
} from "lexical";
import { timestamp } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import Editor from "../Editor";
import { useEditorContext } from "../hooks/useEditorContext";

export default function InputForm() {
  const [post, setPost] = useState("");
  const { addDocument, response } = useFirestore("posts");
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { editor } = useEditorContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  useEffect(() => {
    setActiveEditor(editor);
  }, [editor]);

  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      setPost(root.__cachedText);
    });
  }

  // TODO:
  // Detect code block input
  // Render code block in UI when code is entered
  // clear the form after post

  useEffect(() => {
    const user = `User0${Math.floor(Math.random() * 100)}`;
    const avatars = [
      { src: "/img/avatara.png" },
      { src: "/img/avatar.png" },
      { src: "/img/gamer.png" },
      { src: "/img/man.png" },
    ];
    const avatar = avatars.sort(() => Math.random() - 0.5)[0];
    setUser(user);
    setAvatar(avatar.src);
  }, []);

  const handleSubmit = async (e, node) => {
    e.preventDefault();

    console.log("Editor: ", activeEditor.getEditorState()._selection.anchor);

    const wrapperType = activeEditor.getEditorState()._selection.anchor.type;

    const postToAdd = {
      isCode: wrapperType === "element" ? true : false,
      date: new Date().toDateString(),
      displayName: user,
      avatar: avatar,
      content: post,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    if (!response.error && postToAdd.content !== "") {
      await addDocument(postToAdd);
    }

    if (!response.error) {
      setPost("");
    }

    const selection = $getSelection();

    // activeEditor.update(() => {
    //   if ($isRangeSelection(selection)) {
    //     if (selection.isCollapsed()) {
    //       $wrapLeafNodesInElements(selection, () => $createParagraphNode());
    //     }
    //   }
    // });
  };

  return (
    <>
      <h1>Retrospective Journal</h1>
      <p>Enter your retrospective summary below for the previous week:</p>
      <div className="emojis">
        <p>🟢 Green (All Good!)</p>
        <p>🟡 Yellow (Use caution)</p>
        <p>🔴 Red (Stop / need help)</p>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <Editor onChange={onChange} />
        <button className="btn-submit">Post</button>
      </form>
    </>
  );
}
