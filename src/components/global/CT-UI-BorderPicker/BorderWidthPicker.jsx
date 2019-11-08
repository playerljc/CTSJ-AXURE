import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../CT-UI-Modal/modal';

const selectorPrefix = 'CT-UI-BorderPicker-BorderWidthPicker';

const widthConfig = [0, 1, 2, 3, 4, 5];

/**
 * BorderWidthPickerModal
 * @class BorderWidthPickerModal
 * @classdesc BorderWidthPickerModal
 */
class BorderWidthPickerModal extends React.PureComponent {
  render() {
    return (
      <ul className={`${selectorPrefix}-Modal`}>
        {widthConfig.map((t, index) => {
          return (
            <li
              key={index + 1}
              className={this.props.borderWidth == t ? 'active' : ''}
              onChange={() => {
                if (this.props.onChange) {
                  this.props.onChange(t);
                }
              }}
            >
              {t === 0 ? 'none' : (<div style={{ height: `${t}px` }} />)}
            </li>
          );
        })}
      </ul>
    );
  }
}

BorderWidthPickerModal.propTypes = {
  borderWidth: PropTypes.number,
  onChange: PropTypes.func,
};


/**
 * BorderWidthPicker
 * @class BorderWidthPicker
 * @classdesc BorderWidthPicker
 */
class BorderWidthPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { borderWidth } = props;

    this.state = {
      borderWidth,
    };

    this.onArrowClick = this.onArrowClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      borderWidth: nextProps.borderWidth,
    });
  }

  onArrowClick() {
    const { zIndex = 9999, borderWidth } = this.props;

    const modal = Modal.open({
      title: 'borderWidthSetting',
      zIndex,
      minWidth: 'auto',
      component: (
        <BorderWidthPickerModal
          borderWidth={borderWidth}
          onChange={(width) => {
            this.setState({
              borderWidth: width,
            }, () => {
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

  render() {
    return (
      <div
        className={`${selectorPrefix}`}
        onClick={this.onArrowClick}
      >
        <div
          className={`${selectorPrefix}-Inner`}
        >
          <div />
          <div />
          <div />
        </div>
        <div
          className={`fa fa-caret-right ${selectorPrefix}-Arrow`}
        />
      </div>
    );
  }
}

BorderWidthPicker.propTypes = {
  zIndex: PropTypes.number,
  borderWidth: PropTypes.number,
  onChange: PropTypes.func,
};

export default BorderWidthPicker;
