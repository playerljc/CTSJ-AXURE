import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../global/CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';
import TextShadowSettingPicker from './TextShadowSettingPicker';

import './TextShadowPicker.less';

const selectorPrefix = 'CT-UI-TextShadowPicker';

/**
 * CT-UI-TextShadowPicker
 * @class CT-UI-TextShadowPicker
 * @classdesc 文本阴影
 */
class TextShadowPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      ...value,
    };
  }

  onClick = () => {
    const modal = Modal.open({
      title: 'text-shadow',
      zIndex: window.parseInt(getMaxLevelNumber()) + 1,
      width: '250px',
      minWidth: 'auto',
      component: (
        <TextShadowSettingPicker
          {...this.state}
          onChange={(value) => {
            this.setState(value, () => {
              const { onChange } = this.props;
              if (onChange) {
                onChange(value);
              }
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
  };

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <div
          className={`${selectorPrefix}-Item`}
          onClick={this.onClick}
        >
          <div className={`${selectorPrefix}-Color fa fa-font`} />
          <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
        </div>
      </div>
    );
  }
}

TextShadowPicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default TextShadowPicker;
