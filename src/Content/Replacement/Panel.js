import React from 'react';
import PropTypes from 'prop-types';

import styles from './BaseImage.styl';

const Panel = ({ onDelete, onSave }) => {
  return (
    <div className={styles.panel}>
      <div>
        <button onClick={onSave} className={styles.btn} type="button">
          <i className="far fa-save" />
        </button>
      </div>
      <div>
        <button
          onClick={onDelete}
          className={styles.btn}
          type="button"
          title="Delete"
          alt="Delete"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};

Panel.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Panel;
