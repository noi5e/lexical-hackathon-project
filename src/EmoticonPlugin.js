import { useEffect } from "react";
import { $createEmoticonNode } from "./EmoticonNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";

const colors = new Map([
  [":g:", ["green circle", "🟢"]],
  [":y", ["yellow circle", "🟡"]],
  [":r", ["red circle", "🔴"]],
]);

function emoticonTransform(node) {
  const textContent = node.getTextContent();
  if (textContent === ":)") {
    node.replace($createEmoticonNode("", "😀"));
  }
}

function useEmoticons(editor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      emoticonTransform
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function EmoticonPlugin() {
  const [editor] = useLexicalComposerContext();
  useEmoticons(editor);
  return null;
}
