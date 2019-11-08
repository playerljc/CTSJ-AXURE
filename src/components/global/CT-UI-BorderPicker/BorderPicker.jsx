import React from 'react';
import PropTypes from 'prop-types';

import BorderWidthPicker from './BorderWidthPicker';
import BorderColorPicker from './BorderColorPicker';
import BorderStylePicker from './BorderStylePicker';
import BorderVisablePicker from './BorderVisablePicker';
import { Immutable } from '../../../util/CTMobile-UI-Util';

import './BorderPicker.less';

const selectorPrefix = 'CT-UI-BorderPicker';

/**
 * BorderPicker
 * @class BorderPicker
 * @classdesc BorderPicker
 */
class BorderPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
      borderWidth,
      borderStyle,
      borderColor,
    } = props;

    this.state = {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
      borderWidth,
      borderStyle,
      borderColor,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
      borderWidth,
      borderStyle,
      borderColor,
    } = nextProps;

    this.setState({
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
      borderWidth,
      borderStyle,
      borderColor,
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
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
      borderWidth,
      borderStyle,
      borderColor,
    } = this.state;

    return (
      <div className={`${selectorPrefix} g-grid-list column2`}>
        <div className="g-grid-list-item">
          <BorderWidthPicker
            borderWidth={borderWidth}
            onChange={(changeBorderWidth) => {
              this.setState({
                borderWidth: changeBorderWidth,
              }, () => {
                this.refresh();
              });
            }}
          />
        </div>
        <div className="g-grid-list-item">
          <BorderColorPicker
            borderColor={borderColor}
            onChange={(changeBorderColor) => {
              this.setState({
                borderColor: changeBorderColor,
              }, () => {
                this.refresh();
              });
            }}
          />
        </div>
        <div className="g-grid-list-item">
          <BorderStylePicker
            borderStyle={borderStyle}
            onChange={(changeBorderStyle) => {
              this.setState({
                borderStyle: changeBorderStyle,
              }, () => {
                this.refresh();
              });
            }}
          />
        </div>
        <div className="g-grid-list-item">
          <BorderVisablePicker
            borderLeftDisable={borderLeftDisable}
            borderRightDisable={borderRightDisable}
            borderTopDisable={borderTopDisable}
            borderBottomDisable={borderBottomDisable}
            onChange={({
                         changeBorderLeftDisable,
                         changeBorderRightDisable,
                         changeBorderTopDisable,
                         changeBorderBottomDisable,
                       }) => {
              this.setState({
                borderLeftDisable: changeBorderLeftDisable,
                borderRightDisable: changeBorderRightDisable,
                borderTopDisable: changeBorderTopDisable,
                borderBottomDisable: changeBorderBottomDisable,
              }, () => {
                this.refresh();
              });
            }}
          />
        </div>
      </div>
    );
  }
}

BorderPicker.propTypes = {
  borderLeftDisable: PropTypes.bool,
  borderTopDisable: PropTypes.bool,
  borderBottomDisable: PropTypes.bool,
  borderRightDisable: PropTypes.bool,
  borderWidth: PropTypes.number,
  borderStyle: PropTypes.oneOf([
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
    'inherit',
  ]),
  borderColor: PropTypes.string,
  onChange: PropTypes.func,
};

export default BorderPicker;
