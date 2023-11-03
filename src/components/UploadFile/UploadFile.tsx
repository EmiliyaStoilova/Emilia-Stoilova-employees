import React, { FunctionComponent } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "../Button/Button";

interface UploadFileProps {
  uploadedFile: null | File;
  setUploadedFile: (file: File) => void;
  types: string[];
}

export const UploadFile: FunctionComponent<UploadFileProps> = ({ uploadedFile, setUploadedFile, types }) => {
  return (
    <FileUploader handleChange={setUploadedFile} name="file" types={types}>
      <div className="shadow-md p-6 h-56 rounded-md flex flex-col justify-between items-center cursor-pointer">
        {uploadedFile ? (
          <div className="h-full flex flex-col justify-between py-10">
            <p className="mb-4 text-center font-semibold">{uploadedFile.name}</p>
            <div>
              <Button title="Select other file" />
            </div>
          </div>
        ) : (
          <>
            <span className="mb-4 text-sm">Drag and drop file here</span>
            <span className="mb-4 text-sm">or</span>
            <span className="mb-8 font-semibold text-sm">Upload a file from your device</span>
            <div>
              <Button title="Select file" />
            </div>
          </>
        )}
      </div>
    </FileUploader>
  );
};
