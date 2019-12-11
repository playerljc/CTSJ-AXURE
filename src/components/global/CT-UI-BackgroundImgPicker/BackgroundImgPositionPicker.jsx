import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';

import './BackgroundImgPositionPicker.less';

const selectorPrefix = 'CT-UI-BackgroundImgPositionPicker';

/**
 * BackgroundImgPositionPicker
 * @class BackgroundImgPositionPicker
 * @classdesc BackgroundImgPositionPicker
 */
class BackgroundImgPositionPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = props;

    this.state = {
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = props;

    return {
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     left,
  //     hcenter,
  //     right,
  //     top,
  //     vcenter,
  //     bottom,
  //   } = nextProps;
  //
  //   this.setState({
  //     left,
  //     hcenter,
  //     right,
  //     top,
  //     vcenter,
  //     bottom,
  //   });
  // }

  refresh() {
    const { onChange } = this.props;
    onChange(Immutable.cloneDeep(this.state));
  }

  onXClick(value) {
    const {
      left,
      hcenter,
      right,
    } = this.state;

    const x = {
      left,
      hcenter,
      right,
    };

    for (const p in x) {
      if (value === p) {
        x[p] = true;
      } else {
        x[p] = false;
      }
    }
    this.setState({ ...x }, () => {
      this.refresh();
    });
  }

  onYClick(value) {
    const {
      top,
      vcenter,
      bottom,
    } = this.state;

    const y = {
      top,
      vcenter,
      bottom,
    };

    for (const p in y) {
      if (value === p) {
        y[p] = true;
      } else {
        y[p] = false;
      }
    }
    this.setState({ ...y }, () => {
      this.refresh();
    });
  }

  render() {
    const {
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <table>
          <tbody>
            <tr>
              <td width={50}>X:</td>
              <td align="right">
                <div>
                left
                  <input
                    type="radio"
                    name="x"
                    value="left"
                    checked={!!left}
                    onChange={() => {
                    this.onXClick('left');
                  }}
                  />
                </div>
                <div>
                center
                  <input
                    type="radio"
                    name="x"
                    value="hcenter"
                    checked={!!hcenter}
                    onChange={() => {
                    this.onXClick('hcenter');
                  }}
                  />
                </div>
                <div>
                right
                  <input
                    type="radio"
                    name="x"
                    value="right"
                    checked={!!right}
                    onChange={() => {
                    this.onXClick('right');
                  }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td width={50}>Y:</td>
              <td align="right">
                <div>
                top
                  <input
                    type="radio"
                    name="y"
                    value="top"
                    checked={!!top}
                    onChange={() => {
                    this.onYClick('top');
                  }}
                  />
                </div>
                <div>
                center
                  <input
                    type="radio"
                    name="y"
                    value="vcenter"
                    checked={!!vcenter}
                    onChange={() => {
                    this.onYClick('vcenter');
                  }}
                  />
                </div>
                <div>
                bottom
                  <input
                    type="radio"
                    name="y"
                    value="bottom"
                    checked={!!bottom}
                    onChange={() => {
                    this.onYClick('bottom');
                  }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

BackgroundImgPositionPicker.propTypes = {
  left: PropTypes.bool,
  hcenter: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
  vcenter: PropTypes.bool,
  bottom: PropTypes.bool,
};

export default BackgroundImgPositionPicker;
