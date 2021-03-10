import React from 'react';
import PropTypes from 'prop-types';

import RadiusVisablePicker from './RadiusVisablePicker';
import Input from '../CT-UI-Form/input';
import { Immutable } from '../../../util/CTMobile-UI-Util';

import './RadiusPicker.less';

const selectorPrefix = 'CT-UI-RadiusPicker';

/**
 * RadiusPicker
 * @class RadiusPicker
 * @classdesc RadiusPicker
 */
class RadiusPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
      radius,
    } = props;

    this.state = {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
      radius,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     borderLeftTopRadiusDisable,
  //     borderRightTopRadiusDisable,
  //     borderLeftBottomRadiusDisable,
  //     borderRightBottomRadiusDisable,
  //     radius,
  //   } = props;
  //
  //   return {
  //     borderLeftTopRadiusDisable,
  //     borderRightTopRadiusDisable,
  //     borderLeftBottomRadiusDisable,
  //     borderRightBottomRadiusDisable,
  //     radius,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
      radius,
    } = nextProps;

    this.setState({
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
      radius,
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
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
      radius,
    } = this.state;

    return (
      <div className={`${selectorPrefix} g-grid-list column2`}>
        <div className="g-grid-list-item">
          <Input
            type="text"
            value={radius}
            onChange={(e) => {
              const {value} = e.target;
              this.setState(
                {
                  radius: value.endsWith('%') ? value : window.parseInt(value),
                },
                () => {
                  this.refresh();
                },
              );
            }}
          />
        </div>
        <div className="g-grid-list-item">
          <RadiusVisablePicker
            borderLeftTopRadiusDisable={borderLeftTopRadiusDisable}
            borderRightTopRadiusDisable={borderRightTopRadiusDisable}
            borderLeftBottomRadiusDisable={borderLeftBottomRadiusDisable}
            borderRightBottomRadiusDisable={borderRightBottomRadiusDisable}
            onChange={({
              borderLeftTopRadiusDisable: changeLeftTopRadiusDisable,
              borderRightTopRadiusDisable: changeRightTopRadiusDisable,
              borderLeftBottomRadiusDisable: changeLeftBottomRadiusDisable,
              borderRightBottomRadiusDisable: changeRightBottomRadiusDisable,
            }) => {
              this.setState(
                {
                  borderLeftTopRadiusDisable: changeLeftTopRadiusDisable,
                  borderRightTopRadiusDisable: changeRightTopRadiusDisable,
                  borderLeftBottomRadiusDisable: changeLeftBottomRadiusDisable,
                  borderRightBottomRadiusDisable: changeRightBottomRadiusDisable,
                },
                () => {
                  this.refresh();
                },
              );
            }}
          />
        </div>
      </div>
    );
  }
}

RadiusPicker.propTypes = {
  borderLeftTopRadiusDisable: PropTypes.bool,
  borderRightTopRadiusDisable: PropTypes.bool,
  borderLeftBottomRadiusDisable: PropTypes.bool,
  borderRightBottomRadiusDisable: PropTypes.bool,
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default RadiusPicker;
