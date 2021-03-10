import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

import Modal from '../CT-UI-Modal/modal';

import './ColorPicker.less';

const selectorPrefix = 'CT-UI-ColorPicker';

/**
 * ColorPicker
 * @class ColorPicker
 * @classdesc 背景填充
 */
class ColorPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { color, disabled } = props;

    this.state = {
      color,
      disabled,
    };

    this.onArrowClick = this.onArrowClick.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     color: props.color,
  //     disabled: props.disabled,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: nextProps.color,
      disabled: nextProps.disabled,
    });
  }

  onArrowClick() {
    const { zIndex = 9999, title = 'backgroundColor' } = this.props;
    const { disabled } = this.state;
    if (disabled) return false;

    const modal = Modal.open({
      title,
      zIndex,
      minWidth: 'auto',
      component: (
        <SketchPicker
          color={this.state.color}
          onChangeComplete={(value) => {
            this.setState(
              {
                color: value.hex,
              },
              () => {
                const { onChange } = this.props;
                const { color } = this.state;
                if (onChange) {
                  onChange(color).then(() => {
                    Modal.close(modal);
                  });
                } else {
                  Modal.close(modal);
                }
              },
            );
          }}
        />
      ),
      yscroll: false,
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            Modal.close(modal);
          },
        },
      ],
    });
  }

  render() {
    const { color, disabled } = this.state;

    return (
      <div
        className={`${selectorPrefix} ${disabled ? 'disabled' : ''}`}
        onClick={this.onArrowClick}
      >
        <div className={`${selectorPrefix}-Color`} style={{ backgroundColor: color }} />
        <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
      </div>
    );
  }
}

ColorPicker.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  zIndex: PropTypes.number,
  color: PropTypes.string,
  onChange: PropTypes.func,
};

export default ColorPicker;
