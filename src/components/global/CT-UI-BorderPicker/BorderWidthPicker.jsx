import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './BorderWidthPicker.less';

const selectorPrefix = 'CT-UI-BorderPicker-BorderWidthPicker';

const widthConfig = [0, 1, 2, 3, 4, 5];

/**
 * BorderWidthPickerModal
 * @class BorderWidthPickerModal
 * @classdesc BorderWidthPickerModal
 */
class BorderWidthPickerModal extends React.PureComponent {
  render() {
    const { borderWidth, onChange } = this.props;
    return (
      <ul className={`${selectorPrefix}-Modal`}>
        {widthConfig.map((t, index) => {
          return (
            <li
              key={index + 1}
              className={borderWidth == t ? 'active' : ''}
              onClick={() => {
                if (onChange) {
                  onChange(t);
                }
              }}
            >
              {t === 0 ? 'none' : <div style={{ height: `${t}px` }} />}
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

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     borderWidth: props.borderWidth,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      borderWidth: nextProps.borderWidth,
    });
  }

  onArrowClick() {
    const {
      zIndex = window.parseInt(getMaxLevelNumber()) + 10,
      borderWidth,
      onChange,
    } = this.props;

    const modal = Modal.open({
      title: 'borderWidthSetting',
      zIndex,
      minWidth: 'auto',
      component: (
        <BorderWidthPickerModal
          borderWidth={borderWidth}
          onChange={(width) => {
            this.setState(
              {
                borderWidth: width,
              },
              () => {
                if (onChange) {
                  onChange(width);
                }
                Modal.close(modal);
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

  renderInner() {
    const rels = [];
    for (let i = 3; i >= 1; i--) {
      rels.push(<div key={i} style={{ height: i }} />);
    }
    return rels;
  }

  render() {
    return (
      <div className={`${selectorPrefix}`} onClick={this.onArrowClick}>
        <div className={`${selectorPrefix}-Inner`}>{this.renderInner()}</div>
        <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
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
