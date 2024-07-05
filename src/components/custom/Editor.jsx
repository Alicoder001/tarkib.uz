"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor() {
  const quillRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Start typing",
        modules: {
          toolbar: false, // Remove the default toolbar

          keyboard: {
            bindings: {
              enter: {
                key: "Enter",
                handler: function () {
                  const format = quill.getFormat();
                  if (format.blockquote) {
                    quill.format("blockquote", false);
                  }
                  return true;
                },
              },
            },
          },
        },
      });
      setEditor(quill);

      quill.on("selection-change", (range, oldRange, source) => {
        if (range && range.length > 0) {
          const bounds = quill.getBounds(range.index, range.length);
          setToolbarPosition({ top: bounds.top - 50, left: bounds.left });
          setShowToolbar(true);
        } else {
          setShowToolbar(false);
        }
      });
    }
  }, []);

  const applyFormat = (format, value) => {
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        editor.format(format, value || !editor.getFormat(range)[format]);
      }
    }
  };

  const insertLink = () => {
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        editor.format("link", linkUrl);
        editor.format("underline", true); // Ensure link is underlined
        setShowLinkInput(false);
        setLinkUrl("");
      }
    }
  };

  const getFormattedContent = () => {
    if (editor) {
      const html = editor.root.innerHTML;
      console.log(html); // Get the text in HTML format
    }
  };

  return (
    <div className="relative mt-8">
      {!showLinkInput && showToolbar && (
        <div
          className="absolute z-50 rounded-md border border-gray-300 bg-white p-2 shadow-lg"
          style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
        >
          <button
            className="mr-2 p-1 font-bold text-gray-700 hover:text-black"
            onClick={() => applyFormat("bold")}
          >
            B
          </button>
          <button
            className="mr-2 p-1 italic text-gray-700 hover:text-black"
            onClick={() => applyFormat("italic")}
          >
            I
          </button>
          <button
            className="mr-2 p-1 text-gray-700 underline hover:text-black"
            onClick={() => applyFormat("underline")}
          >
            U
          </button>
          <button
            className="mr-2 p-1 text-gray-700 hover:text-black"
            onClick={() => applyFormat("header", 1)}
          >
            T1
          </button>
          <button
            className="mr-2 p-1 text-gray-700 hover:text-black"
            onClick={() => applyFormat("header", 2)}
          >
            T2
          </button>
          <button
            className="mr-2 p-1 text-gray-700 hover:text-black"
            onClick={() => applyFormat("blockquote")}
          >
            “
          </button>
          <button
            className="mr-2 p-1 text-gray-700 hover:text-black"
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
            🔗
          </button>
        </div>
      )}
      {showLinkInput && (
        <div
          className="absolute z-50 rounded-md border border-gray-300 bg-white p-2 shadow-lg"
          style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
        >
          <div className="flex items-center">
            <input
              type="text"
              className="rounded-md border p-1 focus:border-blue-300 focus:outline-none focus:ring"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
            />
            <button
              className="ml-2 rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600"
              onClick={() => {
                insertLink();
                setShowLinkInput(false);
              }}
            >
              Insert
            </button>
          </div>
        </div>
      )}
      <div
        ref={quillRef}
        className="rounded-lg !border-none border-gray-300 bg-white p-4 !text-3xl"
      ></div>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={getFormattedContent}
      >
        Save Content
      </button>
    </div>
  );
}
