import React, { useState } from 'react';

import UploadFile from './UploadFile';
import Replacement from './Replacement';

export default function ContentContainer() {
  const [file, changeFile] = useState(null);

  return (
    <>
      {!file && (
        <UploadFile onFileUploaded={uploaded => changeFile(uploaded)} />
      )}
      {file && <Replacement file={file} onDelete={() => changeFile(null)} />}
    </>
  );
}
