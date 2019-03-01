import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import Panel from './Panel';

import styles from './BaseImage.styl';

const boxTarget = {
  drop(props, monitor, component) {
    const {
      image: { url, width, height },
    } = monitor.getItem();
    const { x, y } = monitor.getSourceClientOffset();
    // eslint-disable-next-line
    const cR = findDOMNode(component).getBoundingClientRect();
    props.onDrop({ left: x - cR.x, top: y - cR.y, url, width, height });
  },
};

class BaseImage extends Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = { children: null };

  imageRef = createRef();

  handleSave = () => {
    const { onSave } = this.props;
    if (this.imageRef.current) {
      onSave(this.imageRef.current);
    }
  };

  render() {
    const { file, onDelete, connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Panel onDelete={onDelete} onSave={this.handleSave} />
          <img
            alt="Uploaded"
            src={file}
            onLoad={this.handleLoad}
            className={styles.image}
            ref={this.imageRef}
          />
          <button
            onClick={this.handleSave}
            className={styles.save}
            type="button"
          >
            Save
          </button>
        </div>
        {children && children}
      </div>
    );
  }
}

export default DropTarget('img', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(BaseImage);
