import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../global/CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import ShadowSetting from './ShadowSetting';

import './Shadow.less';
import { Immutable } from '../../../../../util/CTMobile-UI-Util';

const selectorPrefix = 'ComponentPropertyStyleTab-Shadow';

/**
 * Shadow
 * @class Shadow
 * @classdesc 阴影
 */
class Shadow extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      ...value,
      // inset: {
      //   disabled: inset.disabled,
      //   offsetX: inset.offsetX,
      //   offsetY: inset.offsetY,
      //   blurRadius: inset.blurRadius,
      //   spreadRadius: inset.spreadRadius,
      //   color: inset.color,
      // },
      // outset: {
      //   disabled: outset.disabled,
      //   offsetX: outset.offsetX,
      //   offsetY: outset.offsetY,
      //   blurRadius: outset.blurRadius,
      //   spreadRadius: outset.spreadRadius,
      //   color: outset.color,
      // },
    };

    this.onOutSetClick = this.onOutSetClick.bind(this);
    this.onInSetClick = this.onInSetClick.bind(this);
  }

  onClick(property) {
    // const {
    //   disabled,
    //   offsetX,
    //   offsetY,
    //   blurRadius,
    //   spreadRadius,
    //   color,
    // } = this.state[property];

    const modal = Modal.open({
      title: `${property}shadow`,
      zIndex: window.parseInt(getMaxLevelNumber()) + 1,
      width: '250px',
      minWidth: 'auto',
      component: (
        <ShadowSetting
          type={property}

          // disabled={disabled}
          // offsetX={offsetX}
          // offsetY={offsetY}
          // blurRadius={blurRadius}
          // spreadRadius={spreadRadius}
          // color={color}
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
          <div
            className={`${selectorPrefix}-Color`}
          />
          <div
            className={`fa fa-caret-right ${selectorPrefix}-Arrow`}
          />
        </div>

        <div
          className={`${selectorPrefix}-InSetItem`}
          onClick={this.onInSetClick}
        >
          <div
            className={`${selectorPrefix}-Color`}
          />
          <div
            className={`fa fa-caret-right ${selectorPrefix}-Arrow`}
          />
        </div>

      </div>
    );
  }
}

Shadow.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Shadow;
