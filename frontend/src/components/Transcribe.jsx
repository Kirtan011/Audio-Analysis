import React, { useState } from "react";
import { Button } from "@radix-ui/themes";

const Transcribe = ({ transcribeText, downloadTextFile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(transcribeText);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e) => {
    setEditableText(e.target.value);
  };

  return (
    <div>
      <div className="mt-6 w-full max-w-3xl bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-2 text-white">
          📝 Transcription:
        </h2>

        {/* Edit/Save Toggle Button */}
        <Button
          className="hover:!bg-blue-800 !absolute !top-1 !right-9 !text-white"
          variant="outline"
          onClick={handleEditToggle}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>

        {/* Download Icon */}
        <div className="absolute top-3 right-3 flex items-center text-white">
          <svg
            className="hover:text-blue-400 cursor-pointer"
            onClick={() => downloadTextFile("transcription.txt", editableText)}
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Editable Text Area or Static Preview */}
        {isEditing ? (
          <textarea
            value={editableText}
            onChange={handleTextChange}
            className="w-full mt-4 bg-zinc-800 text-white p-2 rounded resize-y h-56 outline-none"
          />
        ) : (
          <pre className="whitespace-pre-wrap text-gray-100 mt-4">
            {editableText}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Transcribe;
