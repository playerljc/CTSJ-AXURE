import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../global/CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';
import BorderShadowSettingPicker from './BorderShadowSettingPicker';
import { Immutable } from '../../../util/CTMobile-UI-Util';

import './BorderShadowPicker.less';

const selectorPrefix = 'CT-UI-BorderShadowPicker';

/**
 * CT-UI-BorderShadowPicker
 * @class CT-UI-BorderShadowPicker
 * @classdesc 边框阴影
 */
class BorderShadowPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      ...value,
    };

    this.onOutSetClick = this.onOutSetClick.bind(this);
    this.onInSetClick = this.onInSetClick.bind(this);
  }

  onClick(property) {
    const modal = Modal.open({
      title: `${property}shadow`,
      zIndex: window.parseInt(getMaxLevelNumber()) + 1,
      width: '250px',
      minWidth: 'auto',
      component: (
        <BorderShadowSettingPicker
          type={property}
          {...this.state[property]}
          onChange={({ type, ...other }) => {
            const data = Immutable.cloneDeep(this.state);
            data[type] = other;
            this.setState(data, () => {
              const { onChange } = this.props;
              if (onChange) {
                onChange(data);
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
  }

  onOutSetClick() {
    this.onClick('outset');
  }

  onInSetClick() {
    this.onClick('inset');
  }

  render() {
    return (
      <div
        className={`${selectorPrefix}`}
      >
        <div
          className={`${selectorPrefix}-OutSetItem`}
          onClick={this.onOutSetClick}
        >
          <div className={`${selectorPrefix}-Color`} />
          <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
        </div>

        <div
          className={`${selectorPrefix}-InSetItem`}
          onClick={this.onInSetClick}
        >
          <div className={`${selectorPrefix}-Color`} />
          <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
        </div>

      </div>
    );
  }
}

BorderShadowPicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default BorderShadowPicker;
