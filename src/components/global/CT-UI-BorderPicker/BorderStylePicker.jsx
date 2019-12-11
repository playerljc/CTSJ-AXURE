import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './BorderStylePicker.less';

const selectorPrefix = 'CT-UI-BorderPicker-BorderStylePicker';

// none	定义无边框。
// hidden	与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。
// dotted	定义点状边框。在大多数浏览器中呈现为实线。
// dashed	定义虚线。在大多数浏览器中呈现为实线。
// solid	定义实线。
// double	定义双线。双线的宽度等于 border-width 的值。
// groove	定义 3D 凹槽边框。其效果取决于 border-color 的值。
// ridge	定义 3D 垄状边框。其效果取决于 border-color 的值。
// inset	定义 3D inset 边框。其效果取决于 border-color 的值。
// outset	定义 3D outset 边框。其效果取决于 border-color 的值。
// inherit	规定应该从父元素继承边框样式。

const modalStyleConfig = [
  'none',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'inherit',
];

const displayStyleConfig = [
  'dashed',
  'dashed',
  'solid',
];

/**
 * BorderStylePickerModal
 * @class BorderStylePickerModal
 * @classdesc BorderStylePickerModal
 */
class BorderStylePickerModal extends React.PureComponent {
  render() {
    const { borderStyle, onChange } = this.props;
    return (
      <ul className={`${selectorPrefix}-Modal`}>
        {modalStyleConfig.map((t, index) => {
          return (
            <li
              key={index + 1}
              className={borderStyle == t ? 'active' : ''}
              onClick={() => {
                if (onChange) {
                  onChange(t);
                }
              }}
            >
              {t === 'none' ? 'none' : (<div style={{ height: 0, border: `2px ${t} #000` }} />)}
            </li>
          );
        })}
      </ul>
    );
  }
}

BorderStylePickerModal.propTypes = {
  borderStyle: PropTypes.string,
  onChange: PropTypes.func,
};


/**
 * BorderStylePicker
 * @class BorderStylePicker
 * @classdesc BorderStylePicker
 */
class BorderStylePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { borderStyle } = props;

    this.state = {
      borderStyle,
    };

    this.onArrowClick = this.onArrowClick.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     borderStyle: props.borderStyle,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      borderStyle: nextProps.borderStyle,
    });
  }

  onArrowClick() {
    const {
      zIndex = window.parseInt(getMaxLevelNumber()) + 10,
      borderStyle,
      onChange,
    } = this.props;

    const modal = Modal.open({
      title: 'borderStyleSetting',
      zIndex,
      minWidth: 'auto',
      component: (
        <BorderStylePickerModal
          borderStyle={borderStyle}
          onChange={(width) => {
            this.setState({
              borderStyle: width,
            }, () => {
              if (onChange) {
                onChange(width);
              }
              Modal.close(modal);
            });
          }}
        />
      ),
      yscroll: false,
      buttons: [{
        text: 'cancel',
        handler: () => {
          Modal.close(modal);
        },
      }],
    });
  }

  renderInner() {
    return displayStyleConfig.map((t, index) => {
      return (<div key={index} style={{ height: 0, border: `1px ${t} #000` }} />);
    });
  }

  render() {
    return (
      <div
        className={`${selectorPrefix}`}
        onClick={this.onArrowClick}
      >
        <div
          className={`${selectorPrefix}-Inner`}
        >
          {this.renderInner()}
        </div>
        <div
          className={`fa fa-caret-right ${selectorPrefix}-Arrow`}
        />
      </div>
    );
  }
}

BorderStylePicker.propTypes = {
  zIndex: PropTypes.number,
  borderStyle: PropTypes.string,
  onChange: PropTypes.func,
};

export default BorderStylePicker;
