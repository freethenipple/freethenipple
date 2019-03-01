import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import styles from './Gallery.styl';

import img1 from './imgs/1.png';
import img2 from './imgs/2.png';
import img3 from './imgs/3.png';
import img4 from './imgs/4.png';
import img5 from './imgs/5.png';
import img6 from './imgs/6.png';

const array = [img1, img2, img3, img4, img5, img6];

export default class Gallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { onClick } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Gallery of male nipples</div>
        <div className={styles.subtitle}>
          Click on the image or just simply drag it to your picture, then change
          size and position and click save.
        </div>
        <div className={styles.content}>
          {array.map(p => (
            <Image
              url={p}
              key={p}
              onClick={() => onClick({ top: 0, left: 0, url: p, width: 100 })}
            />
          ))}
        </div>
      </div>
    );
  }
}
