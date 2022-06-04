import { useState } from "react";
import { $getRoot, $getSelection } from "lexical";
import { timestamp } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import Editor from "../Editor";

export default function InputForm() {
  const [post, setPost] = useState("");
  const { addDocument, response } = useFirestore("posts");

  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
      setPost(root.__cachedText);
    });
  }

  const user = `User0${Math.floor(Math.random() * 100)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postToAdd = {
      displayName: user,
      content: post,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    if (!response.error) {
      await addDocument(postToAdd);
    }

    if (!response.error) {
      setPost("");
    }
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
