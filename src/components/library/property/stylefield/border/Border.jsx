import React from 'react';
import PropTypes from 'prop-types';
import BorderPicker from '../../../../global/CT-UI-BorderPicker/BorderPicker';

import './Border.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Border';

/**
 * Border
 * @class Border
 * @classdesc 边框
 */
class Border extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = { ...value };
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        {/* <BorderPicker
          {...this.state}
          onChange={() => {

          }}
        /> */}
      </div>
    );
  }
}

Border.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Border;
