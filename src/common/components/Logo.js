import React, { Component } from 'react';
import cn from 'classnames';

import styles from './Logo.styl';

export default class Logo extends Component {
  render() {
    return <i className={cn('fas fa-female', styles.logo)} />;
  }
}
