import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import styles from './ImagePreview.styl';

const collect = monitor => {
  return {
    sourceOffset: monitor.getSourceClientOffset(),
  };
};

class ImagePreview extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // eslint-disable-next-line
    sourceOffset: PropTypes.any,
    isDragging: PropTypes.bool.isRequired,
  };

  static defaultProps = { sourceOffset: null, height: '' };

  getLayerStyles() {
    const { sourceOffset } = this.props;
    return {
      transform: sourceOffset
        ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)`
        : '',
      opacity: sourceOffset ? 0.5 : 0,
    };
  }

  render() {
    const { isDragging, url, width, height } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div className={styles.imgPreviewContainer}>
        <img
          src={url}
          ref={c => {
            this.imageRef = c;
          }}
          alt="added"
          style={{
            ...this.getLayerStyles(),
            width,
            height,
          }}
        />
      </div>
    );
  }
}

export default DragLayer(collect)(ImagePreview);
