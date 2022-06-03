import "./styles.css";
import Editor from "./Editor";

export default function App() {
  return (
    <div className="App">
      <h1>Retrospective Journal</h1>
      <p>Enter your retrospective summary below for the previous week:</p>
      <p>🟢 Green (All Good!)</p>
      <p>🟡 Yellow (Use caution)</p>
      <p>🔴 Red (Stop / need help)</p>
      <Editor />
    </div>
  );
}
