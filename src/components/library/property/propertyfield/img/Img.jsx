import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImgImportPicker from '../../../../global/CT-UI-BackgroundImgPicker/BackgroundImgImportPicker';

import './Img.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Img';

/**
 * Img
 * @class Img
 * @classdesc 选择图片文件
 */
class Img extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;

    this.setState({
      value,
    });
  }

  render() {
    const { onChange } = this.props;
    const { value } = this.state;

    return (
      <div className={selectorPrefix}>
        <BackgroundImgImportPicker
          backgroundImg={value}
          onChange={(changeBackgroundImg) => {
          this.setState({
            value: changeBackgroundImg,
          }, () => {
            onChange(changeBackgroundImg);
          });
        }}
        />
      </div>
    );
  }
}

Img.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Img;
