import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import Draggable from '../../common/components/Draggable';
import ImagePreview from '../../common/components/ImagePreview';

import styles from './Image.styl';

const boxSource = {
  beginDrag(props) {
    return props;
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      props.onDelete();
    }
  },
};

class Image extends Component {
  static propTypes = {
    // eslint-disable-next-line
    image: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

    updateImage: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    hideSourceOnDrag: PropTypes.bool,
    connectDragSource: PropTypes.func.isRequired,
  };

  static defaultProps = { hideSourceOnDrag: false };

  componentDidMount() {
    const {
      image: { url, height },
    } = this.props;
    if (url && !height) {
      this.updateImage();
    }
  }

  componentDidUpdate() {
    const {
      image: { height },
    } = this.props;
    if (!height) {
      this.updateImage();
    }
  }

  handleDrag = (dx, dy) => {
    const { updateImage } = this.props;
    const { image } = this.props;
    updateImage({
      ...image,
      width: image.width + dx,
      height: image.height + dy,
    });
  };

  updateImage = () => {
    const { updateImage, image } = this.props;
    updateImage({ ...image, height: this.imageRef.height });
  };

  render() {
    const {
      hideSourceOnDrag,
      image: { left, top, url, width, height },
      image,
      connectDragSource,
      isDragging,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }
    return (
      <div style={{ left, top, height, width }} className={styles.container}>
        {connectDragSource(
          <div className={styles.content}>
            <img
              src={url}
              ref={c => {
                this.imageRef = c;
              }}
              alt="added"
              style={{
                width,
                height,
                opacity: isDragging ? 0 : 1,
                cursor: 'move',
              }}
              className={styles.img}
            />
            <ImagePreview {...image} isDragging={isDragging} />
          </div>
        )}

        <Draggable
          style={{
            opacity: isDragging ? 0 : 1,
          }}
          onDrag={(dx, dy) => this.handleDrag(dx, dy)}
          className={styles.handler}
        />
        <div
          className={styles.box}
          style={{
            width,
            height,
            opacity: isDragging ? 0 : 1,
          }}
        />
      </div>
    );
  }
}

export default DragSource('img', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(Image);
