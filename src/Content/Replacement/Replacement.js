import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import isMobile from 'ismobilejs';
import { DragDropContext } from 'react-dnd';

import BaseImage from './BaseImage';
import Image from './Image';
import Gallery from '../Gallery/Gallery';

import saveImage from './saveImage';

import styles from './Replacement.styl';

const Replacement = ({ file, onDelete }) => {
  const [img, updateImage] = useState(null);

  function handleSave(baseImgRef) {
    saveImage(baseImgRef, file, img);
  }

  return (
    <div className={styles.container}>
      <BaseImage
        file={file}
        onDrop={updateImage}
        onDelete={onDelete}
        onSave={handleSave}
      >
        {img && (
          <Image
            image={img}
            updateImage={updateImage}
            onDelete={() => updateImage(null)}
          />
        )}
      </BaseImage>
      <Gallery onClick={updateImage} />
    </div>
  );
};

Replacement.propTypes = {
  onDelete: PropTypes.func.isRequired,
  file: PropTypes.string.isRequired,
};

export default DragDropContext(isMobile.any ? TouchBackend : HTML5Backend)(
  Replacement
);
