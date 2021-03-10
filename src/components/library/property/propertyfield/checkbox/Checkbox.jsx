import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Checkbox';

/**
 * Checkbox
 * @class Checkbox
 * @classdesc 复选框
 */
class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);

    const { checked } = props;

    this.state = { checked };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
  //
  //   return {
  //     value,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;

    this.setState({
      checked,
    });
  }

  render() {
    const { onChange, label } = this.props;
    const { checked } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <span>{label}：</span>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={(e) => {
            const c = e.target.checked;
            onChange(c);
          }}
        />
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
