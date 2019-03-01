import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const getMousePosition = event => ({
  x: event.pageX - (window.scrollX || window.pageXOffset),
  y: event.pageY - (window.scrollY || window.pageYOffset),
});

export const getTouchPosition = event => ({
  x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
  y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
});

const addEvents = events => {
  Reflect.ownKeys(events).forEach(name => {
    document.addEventListener(name, events[name]);
  });
};

const removeEvents = events => {
  Reflect.ownKeys(events).forEach(name => {
    document.removeEventListener(name, events[name]);
  });
};

export default class Draggable extends Component {
  static propTypes = {
    children: PropTypes.node,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrag: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
    onDragStart: Function.prototype,
    onDragEnd: Function.prototype,
  };

  state = { pressed: false, x: 0, y: 0 };

  componentWillUnmount() {
    removeEvents({
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp,
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
    });
  }

  handleMouseDown = event => {
    addEvents({
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp,
    });
    this.start(getMousePosition(event));
  };

  handleTouchStart = event => {
    addEvents({
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
    });
    this.start(getTouchPosition(event));
  };

  start = ({ x, y }, event) => {
    const { onDragStart } = this.props;
    this.setState({ pressed: true, x, y });
    onDragStart(event);
  };

  handleMouseMove = event => {
    this.move(getMousePosition(event), event);
  };

  handleTouchMove = event => {
    this.move(getTouchPosition(event), event);
  };

  move = ({ x, y }, event) => {
    const { onDrag } = this.props;
    const { pressed } = this.state;
    if (pressed) {
      const { x: oldX, y: oldY } = this.state;
      const dx = x - oldX;
      const dy = y - oldY;
      this.setState({ x, y }, () => onDrag(dx, dy, event));
    }
  };

  handleMouseUp = () => {
    removeEvents({
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp,
    });
    this.end();
  };

  handleTouchEnd = () => {
    removeEvents({
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
    });
    this.end();
  };

  end() {
    const { onDragEnd } = this.props;
    this.setState({ pressed: false, x: 0, y: 0 }, () => onDragEnd());
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <div
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
