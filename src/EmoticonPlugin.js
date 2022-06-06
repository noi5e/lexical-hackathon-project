import { useEffect } from "react";
import { $createEmoticonNode } from "./EmoticonNode.ts";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { useEditorContext } from "./hooks/useEditorContext";

const colors = new Map([
  [":g:", ["green circle", "🟢"]],
  [":y:", ["yellow circle", "🟡"]],
  [":r:", ["red circle", "🔴"]],
  [":G:", ["green circle", "🟢"]],
  [":Y:", ["yellow circle", "🟡"]],
  [":R:", ["red circle", "🔴"]],
  ["🟢", ["green circle", "🟢"]],
  ["🟡", ["yellow circle", "🟡"]],
  ["🔴", ["red circle", "🔴"]],
]);

// function emoticonTransform(node) {
//   const textContent = node.getTextContent();
//   if (textContent === ":)") {
//     node.replace($createEmoticonNode("", "😀"));
//   }
// }

function findAndTransformColors(node) {
  const text = node.getTextContent();
  console.log(text);

  for (let i = 0; i < text.length; i++) {
    const emojiData = colors.get(text[i]) || colors.get(text.slice(i, i + 3));

    if (emojiData !== undefined) {
      console.log("Found it!");
      const [emojiStyle, emojiText] = emojiData;
      let targetNode;

      if (i === 0) {
        [targetNode] = node.splitText(i + 3);
      } else {
        [, targetNode] = node.splitText(i, i + 3);
      }

      const emoticonNode = $createEmoticonNode(emojiStyle, emojiText);
      targetNode.replace(emoticonNode);
      return emoticonNode;
    }
  }
}

function textNodeTransform(node) {
  let targetNode = node;

  while (targetNode && targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }

    targetNode = findAndTransformColors(targetNode);
  }
}

function useEmoticons(editor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      textNodeTransform
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function EmoticonPlugin() {
  const [editor] = useLexicalComposerContext();
  const { dispatch } = useEditorContext();
  useEffect(() => {
    dispatch({ type: "GET_EDITOR", payload: editor });
  }, []);

  useEmoticons(editor);
  return null;
}
