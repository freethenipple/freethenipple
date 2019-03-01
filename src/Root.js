import React from 'react';

import Header from './Header';
import Content from './Content/ContentContainer';

import 'normalize.css';
import './common/uikit/layout.styl';

const Root = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};

export default Root;
