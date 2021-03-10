import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../global/CT-UI-Form/index';
import ColorPicker from '../../global/CT-UI-ColorPicker/ColorPicker';
import TextShadowPicker from '../../global/CT-UI-ShadowPicker/TextShadowPicker';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';
import FontFamilyWSDPicker from './FontFamilyWSDPicker';

import './FontFamilyPicker.less';

const selectorPrefix = 'CT-UI-FontFamilyPicker';

const fontSizeEnum = [6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 28, 36, 48, 72];

const fontFamilyEnum = [
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'math',
  'emoji',
  'fangsong',
];

/**
 * FontFamilyPicker
 * @class FontFamilyPicker
 * @classdesc FontFamilyPicker
 */
class FontFamilyPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      color,
      textShadow,
    } = props;

    this.state = {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      color,
      textShadow,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     fontFamily,
  //     fontSize,
  //     fontWeight,
  //     fontStyle,
  //     textDecoration,
  //     color,
  //     textShadow,
  //   } = props;
  //
  //   return {
  //     fontFamily,
  //     fontSize,
  //     fontWeight,
  //     fontStyle,
  //     textDecoration,
  //     color,
  //     textShadow,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      color,
      textShadow,
    } = nextProps;

    this.setState({
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      color,
      textShadow,
    });
  }

  refresh() {
    const { onChange } = this.props;
    if (onChange) {
      const data = Immutable.cloneDeep(this.state);
      onChange(data);
    }
  }

  render() {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      color,
      textShadow,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <div className="g-grid-list column2">
          <div className="g-grid-list-item">
            <Select
              value={fontFamily}
              onChange={(e) => {
                this.setState(
                  {
                    fontFamily: e.target.value,
                  },
                  () => {
                    this.refresh();
                  },
                );
              }}
            >
              {fontFamilyEnum.map((t) => (
                <option key={`${t}`} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div className="g-grid-list-item">
            <Select
              value={fontSize}
              onChange={(e) => {
                this.setState(
                  {
                    fontSize: e.target.value,
                  },
                  () => {
                    this.refresh();
                  },
                );
              }}
            >
              {fontSizeEnum.map((t) => (
                <option key={`${t}`} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <FontFamilyWSDPicker
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            textDecoration={textDecoration}
            onChange={({
              fontWeight: changeFontWeight,
              fontStyle: changeFontStyle,
              textDecoration: changeTextDecoration,
            }) => {
              this.setState(
                {
                  fontWeight: changeFontWeight,
                  fontStyle: changeFontStyle,
                  textDecoration: changeTextDecoration,
                },
                () => {
                  this.refresh();
                },
              );
            }}
          />
        </div>

        <div className="g-grid-list column2">
          <div className="g-grid-list-item">
            <ColorPicker
              color={color}
              zIndex={window.parseInt(getMaxLevelNumber()) + 1}
              onChange={(changeColor) => {
                return new Promise((resolve, reject) => {
                  this.setState(
                    {
                      color: changeColor,
                    },
                    () => {
                      this.refresh();
                      resolve();
                    },
                  );
                });
              }}
            />
          </div>
          <div className="g-grid-list-item">
            <TextShadowPicker
              value={textShadow}
              onChange={(changeTextShadow) => {
                this.setState(
                  {
                    textShadow: changeTextShadow,
                  },
                  () => {
                    this.refresh();
                  },
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

FontFamilyPicker.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.bool,
  fontStyle: PropTypes.bool,
  textDecoration: PropTypes.bool,
  color: PropTypes.string,
  textShadow: PropTypes.object,
  onChange: PropTypes.func,
};

export default FontFamilyPicker;
