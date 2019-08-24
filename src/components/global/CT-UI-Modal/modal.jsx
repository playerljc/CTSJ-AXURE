import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './modal.less';

const selectorPrefix = 'CT-UI-Modal';

/**
 * ModalComponent
 * @class ModalComponent
 * @classdesc ModalComponent
 */
class ModalComponent extends React.Component {
  renderButtons() {
    const { buttons = [] } = this.props;
    const result = [];
    buttons.forEach(({ text = '', handler }, index) => {
      result.push(
        <div
          key={index + 1}
          className={`${selectorPrefix}-Buttons-Btn`}
          onClick={() => {
            if (handler) {
              handler();
            }
          }}
        >{text}
        </div>);
    });
    return result;
  }

  close() {
    this.el.parentElement.removeChild(this.el);
  }

  render() {
    const { title = '', zIndex = 9999, mask = true, component } = this.props;
    return (
      <div
        ref={(el) => {
          this.el = el;
        }}
        className={`${selectorPrefix}`}
        style={{ zIndex }}
        onClick={() => {
          if (!mask) {
            this.close();
          }
        }}
      >
        <div className={`${selectorPrefix}-Inner`}>
          <div className={`${selectorPrefix}-Title`}>{title}</div>
          <div className={`${selectorPrefix}-Content`}>
            {component}
          </div>
          <div className={`${selectorPrefix}-Buttons`}>{this.renderButtons()}</div>
        </div>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  title: PropTypes.string,
  component: PropTypes.object,
  width:PropTypes.string,
  height:PropTypes.string,
  zIndex: PropTypes.number,
  mask: PropTypes.bool,
  buttons: PropTypes.array,
};

const Modal = {
  open(config) {
    const parentEl = document.createElement('div');
    ReactDOM.render(
      <ModalComponent {...config} />,
      parentEl,
    );
    const el = parentEl.firstElementChild;
    document.body.appendChild(el);
    return el;
  },
  close(el) {
    el.parentElement.removeChild(el);
  },
};

export default Modal;
