import React, { useState } from "react";
import { UploadFile } from "./components";

function App() {
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  return (
    <div className="py-8 px-4 lg:px-0 mx-auto max-w-2xl">
      <UploadFile uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} types={["csv"]} />
    </div>
  );
}

export default App;
