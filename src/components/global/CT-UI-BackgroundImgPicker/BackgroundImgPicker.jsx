import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImgImportPicker from './BackgroundImgImportPicker';
import BackgroundImgPositionPicker from './BackgroundImgPositionPicker';
import BackgroundImgRepeatPicker from './BackgroundImgRepeatPicker';
import { Immutable } from '../../../util/CTMobile-UI-Util';

const selectorPrefix = 'CT-UI-BackgroundImgPicker';

/**
 * BackgroundImgPicker
 * @class BackgroundImgPicker
 * @classdesc BackgroundImgPicker
 */
class BackgroundImgPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      backgroundImg,
      repeat,
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = props;

    this.state = {
      backgroundImg,
      repeat,
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      backgroundImg,
      repeat,
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = nextProps;

    this.setState({
      backgroundImg,
      repeat,
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
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
      backgroundImg,
      repeat,
      left,
      hcenter,
      right,
      top,
      vcenter,
      bottom,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        {/* 导入图片 */}
        <BackgroundImgImportPicker
          backgroundImg={backgroundImg}
          onChange={(changeBackgroundImg) => {
            this.setState({
              backgroundImg: changeBackgroundImg,
            }, () => {
              this.refresh();
            });
          }}
        />
        {/* 图片位置 */}
        <BackgroundImgPositionPicker
          left={left}
          hcenter={hcenter}
          right={right}
          top={top}
          vcenter={vcenter}
          bottom={bottom}
          onChange={(value) => {
            this.setState(value, () => {
              this.refresh();
            });
          }}
        />
        {/* 图片重复 */}
        <BackgroundImgRepeatPicker
          repeat={repeat}
          onChange={(changeRepeat) => {
            this.setState({
              repeat: changeRepeat,
            }, () => {
              this.refresh();
            });
          }}
        />
      </div>
    );
  }
}

BackgroundImgPicker.propTypes = {
  backgroundImg: PropTypes.string,
  repeat: PropTypes.string,

  left: PropTypes.bool,
  hcenter: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
  vcenter: PropTypes.bool,
  bottom: PropTypes.bool,

  onChange: PropTypes.func,
};

export default BackgroundImgPicker;
