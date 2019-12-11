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

  static getDerivedStateFromProps(props, state) {
    const {
      value,
    } = props;

    return {
      ...value,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     value,
  //   } = nextProps;
  //
  //   this.setState({
  //     ...value,
  //   });
  // }

  render() {
    const { onChange } = this.props;
    return (
      <div className={`${selectorPrefix}`}>
        <BorderPicker
          {...this.state}
          onChange={(border) => {
            if (onChange) {
              onChange(border);
            }
          }}
        />
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
