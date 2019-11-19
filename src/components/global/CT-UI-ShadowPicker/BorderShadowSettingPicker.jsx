import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import { Input } from '../../global/CT-UI-Form/index';
import ColorPicker from '../../global/CT-UI-ColorPicker/ColorPicker';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './BorderShadowSettingPicker.less';

const selectorPrefix = 'CT-UI-BorderShadowSettingPicker';

/**
 * BorderShadowSettingPicker
 * @class BorderShadowSettingPicker
 * @classdesc 边框阴影设置
 */
class BorderShadowSettingPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      onChange,
      ...other
    } = props;

    this.state = {
      ...other,
    };
  }

  /**
   * onChange
   * @param {String} - property
   * @param {String} - value
   */
  onChange(property, value) {
    const data = Immutable.cloneDeep(this.state);
    data[property] = value;
    this.setState(data, () => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(data);
      }
    });
  }

  render() {
    const {
      type,
      disabled,
      offsetX,
      offsetY,
      blurRadius,
      spreadRadius,
      color,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <table cellPadding={0} cellSpacing={10}>
          <tbody>
            <tr>
              <td align="right">{`${type}shadow`}：</td>
              <td align="right">
                <input
                  type="checkbox"
                  checked={!disabled}
                  onChange={(e) => {
                  this.onChange('disabled', !e.target.checked);
                }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">offset：</td>
              <td align="right">
              x:<Input
                type="number"
                value={offsetX}
                disabled={disabled}
                onChange={(e) => { this.onChange('offsetX', window.parseInt(e.target.value)); }}
              />
              y:<Input
                type="number"
                value={offsetY}
                disabled={disabled}
                onChange={(e) => { this.onChange('offsetY', window.parseInt(e.target.value)); }}
              />
              </td>
            </tr>
            <tr>
              <td align="right">blurRadius：</td>
              <td align="right">
                <Input
                  type="number"
                  value={blurRadius}
                  disabled={disabled}
                  onChange={(e) => { this.onChange('blurRadius', window.parseInt(e.target.value)); }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">spreadRadius：</td>
              <td align="right">
                <Input
                  type="number"
                  value={spreadRadius}
                  disabled={disabled}
                  onChange={(e) => { this.onChange('spreadRadius', window.parseInt(e.target.value)); }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">color：</td>
              <td align="right">
                <ColorPicker
                  disabled={disabled}
                  color={color}
                  zIndex={window.parseInt(getMaxLevelNumber()) + 2}
                  onChange={(value) => {
                  return new Promise((resolve) => {
                    this.onChange('color', value);
                    resolve();
                  });
                }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

BorderShadowSettingPicker.propTypes = {
  type: PropTypes.oneOf(['inset', 'outset']),
  disabled: PropTypes.bool,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  blurRadius: PropTypes.number,
  spreadRadius: PropTypes.number,
  color: PropTypes.string,
  onChange: PropTypes.func,
};

export default BorderShadowSettingPicker;
