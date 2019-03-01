import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import ImagePreview from '../../common/components/ImagePreview';

import styles from './Gallery.styl';

const MARGIN = 15;

const boxSource = {
  beginDrag({ url }, monitor, component) {
    // eslint-disable-next-line
    const { width, height } = findDOMNode(component).getBoundingClientRect();
    return {
      image: {
        url,
        width,
        height: height - MARGIN,
      },
    };
  },
};

class Image extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const { url, isDragging, connectDragSource, onClick } = this.props;

    return connectDragSource(
      <div>
        <div onClick={onClick} style={{ opacity: isDragging ? 0 : 1 }}>
          <img src={url} className={styles.img} alt="selected" />
        </div>
        <ImagePreview {...this.props} width={100} />
      </div>
    );
  }
}

export default DragSource('img', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(Image);
