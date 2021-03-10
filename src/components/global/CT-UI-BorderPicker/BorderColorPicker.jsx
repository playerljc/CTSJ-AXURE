import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';
import ColorPicker from '../CT-UI-ColorPicker/ColorPicker';

/**
 * BorderColorPicker
 * @class BorderColorPicker
 * @classdesc BorderColorPicker
 */
class BorderColorPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { borderColor } = props;

    this.state = {
      borderColor,
    };
  }

  render() {
    const { borderColor } = this.state;

    return (
      <ColorPicker
        zIndex={window.parseInt(getMaxLevelNumber()) + 1}
        color={borderColor}
        onChange={(value) => {
          return new Promise((resolve) => {
            this.setState(
              {
                borderColor: value,
              },
              () => {
                const { onChange } = this.props;
                if (onChange) {
                  if (onChange) {
                    onChange(value);
                  }
                }
                resolve();
              },
            );
          });
        }}
      />
    );
  }
}

BorderColorPicker.propTypes = {
  borderColor: PropTypes.string,
  onChange: PropTypes.func,
};

export default BorderColorPicker;
