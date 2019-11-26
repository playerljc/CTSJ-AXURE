import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImgPicker from '../../../../../../global/CT-UI-BackgroundImgPicker/BackgroundImgPicker';

/**
 * FillImg
 * @class FillImg
 * @classdesc 背景图片填充
 */
class FillImg extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      ...value,
    };
  }

  render() {
    return (
      <BackgroundImgPicker
        {...this.state}
        onChange={(value) => {
          return new Promise((resolve) => {
            this.setState(value, () => {
              const { onChange } = this.props;
              if (onChange) {
                onChange({
                  ...this.state,
                });
              }
              resolve();
            });
          });
        }}
      />
    );
  }
}

FillImg.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default FillImg;
