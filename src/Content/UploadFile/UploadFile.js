import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import TargetBox from './TargetBox';

const { FILE } = NativeTypes;

const UploadFile = ({ onFileUploaded }) => {
  const [error, changeError] = useState(false);

  function getFile(file) {
    if (file.type.includes('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        onFileUploaded(reader.result);
      };
    } else {
      changeError(true);
    }
  }

  function handleDrop(item, monitor) {
    getFile(monitor.getItem().files[0]);
  }

  function handleAddImage(evt) {
    getFile(evt.target.files[0]);
  }

  return (
    <TargetBox
      accepts={FILE}
      onDrop={handleDrop}
      onAddImage={handleAddImage}
      error={error}
    />
  );
};

UploadFile.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(UploadFile);
