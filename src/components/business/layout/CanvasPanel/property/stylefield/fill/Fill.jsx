import React from 'react';
import PropTypes from 'prop-types';

import ColorPicker from '../../../../../../global/CT-UI-ColorPicker/ColorPicker';
import { getMaxLevelNumber } from '../../../../../../library/component/ComponentBaseHOC';

/**
 * Fill
 * @class Fill
 * @classdesc 背景填充
 */
class Fill extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      ...value,
    };
  }

  render() {
    const { backgroundColor } = this.state;

    return (
      <ColorPicker
        zIndex={window.parseInt(getMaxLevelNumber()) + 1}
        color={backgroundColor}
        onChange={(value) => {
          return new Promise((resolve) => {
            this.setState({
              backgroundColor: value,
            }, () => {
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

Fill.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Fill;
