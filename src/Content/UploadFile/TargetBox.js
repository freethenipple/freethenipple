import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import styles from './styles.styl';

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor);
    }
  },
};

function TargetBox({ connectDropTarget, onAddImage, error }) {
  return connectDropTarget(
    <div className={styles.container}>
      <div className={styles.box}>
        {error && (
          <div className={styles.error}>
            {'(: Error: It must be a picture :)'}
          </div>
        )}
        <div className={styles.text}>
          Drag your photo here or click in this area
        </div>
        <input
          type="file"
          className={styles.input}
          onChange={onAddImage}
          title=" "
        />
      </div>
    </div>
  );
}

TargetBox.propTypes = {
  error: PropTypes.bool.isRequired,
  onAddImage: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(props => props.accepts, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(TargetBox);
