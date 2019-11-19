import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import { Input } from '../../global/CT-UI-Form/index';
import ColorPicker from '../../global/CT-UI-ColorPicker/ColorPicker';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './TextShadowSettingPicker.less';

const selectorPrefix = 'CT-UI-TextShadowSettingPicker';

/**
 * TextShadowSettingPicker
 * @class TextShadowSettingPicker
 * @classdesc 文本阴影设置
 */
class TextShadowSettingPicker extends React.PureComponent {
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
      hShadow,
      vShadow,
      blur,
      color,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <table cellPadding={0} cellSpacing={10}>
          <tbody>
            <tr>
              <td align="right">shadow：</td>
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
                hShadow:<Input
                  type="number"
                  value={hShadow}
                  disabled={disabled}
                  onChange={(e) => { this.onChange('hShadow', window.parseInt(e.target.value)); }}
                />
                vShadow:<Input
                  type="number"
                  value={vShadow}
                  disabled={disabled}
                  onChange={(e) => { this.onChange('vShadow', window.parseInt(e.target.value)); }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">blur：</td>
              <td align="right">
                <Input
                  type="number"
                  value={blur}
                  disabled={disabled}
                  onChange={(e) => { this.onChange('blur', window.parseInt(e.target.value)); }}
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

TextShadowSettingPicker.propTypes = {
  // 是否启用
  disabled: PropTypes.bool,
  // 水平阴影的位置
  hShadow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // 垂直阴影的位置
  vShadow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // 模糊的距离
  blur: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // 颜色
  color: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextShadowSettingPicker;
