import InputForm from "./components/InputForm";
import Restrospects from "./components/Restrospects";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <InputForm />
      <Restrospects />
      <em style={{ color: "grey" }}>Powered by the Lexical Team - 22Sum.2</em>
    </div>
  );
}
