import { useState } from "react";
import TextInput from "../Lexical/TextInput";

export default function InputForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <form className="processor-form" onSubmit={handleSubmit}>
      <h2 className="form-header">Start Typing</h2>
      <TextInput />
      <button className="btn-submit">Submit</button>
    </form>
  );
}
