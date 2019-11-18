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
class ModalComponent extends React.PureComponent {
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
    const {
      title = '',
      zIndex = 9999,
      minWidth = '60%',
      maxWidth = '80%',
      minHeight,
      maxHeight = '80%',
      width,
      height,
      mask = true,
      innerClass = '',
      titleClass = '',
      contentClass = '',
      buttonsClass = '',
      component,
      xscroll = true,
      yscroll = true,
    } = this.props;

    return (
      <div
        ref={(el) => {
          this.el = el;
        }}
        className={`${selectorPrefix}`}
        style={{
          zIndex,
        }}
        onClick={() => {
          if (!mask) {
            this.close();
          }
        }}
      >
        <div
          className={`${selectorPrefix}-Inner ${innerClass}`}
          style={{
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            width,
            height,
          }}
        >
          <div className={`${selectorPrefix}-Title ${titleClass}`}>{title}</div>
          <div className={`${selectorPrefix}-Content ${xscroll ? 'XScroll' : ''} ${yscroll ? 'YScroll' : ''} ${contentClass}`}>
            {component}
          </div>
          <div className={`${selectorPrefix}-Buttons ${buttonsClass}`}>{this.renderButtons()}</div>
        </div>
      </div>
    );
  }
}

// 指定 props 的默认值：
ModalComponent.defaultProps = {
  innerClass: '',
  titleClass: '',
  contentClass: '',
  buttonsClass: '',
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  component: PropTypes.object,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  zIndex: PropTypes.number,
  mask: PropTypes.bool,
  innerClass: PropTypes.string,
  titleClass: PropTypes.string,
  contentClass: PropTypes.string,
  buttonsClass: PropTypes.string,
  buttons: PropTypes.array,
  xscroll: PropTypes.bool,
  yscroll: PropTypes.bool,
};

const Modal = {
  open(config) {
    const parentEl = document.createElement('div');
    parentEl.className = `${selectorPrefix}-Wrap`;

    ReactDOM.render(
      <ModalComponent {...config} />,
      parentEl,
    );
    document.body.appendChild(parentEl);
    return parentEl;
  },
  close(el) {
    ReactDOM.unmountComponentAtNode(el);
  },
};

export default Modal;
