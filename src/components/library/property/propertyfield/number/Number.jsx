import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './Number.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Number';

/**
 * Number
 * @class Number
 * @classdesc 数字
 */
class Number extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = { value };
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
    const { value } = nextProps;

    this.setState({
      value,
    });
  }

  render() {
    const { onChange } = this.props;
    const { value } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim();
            this.setState(
              {
                value: v,
              },
              () => {
                onChange(v);
              },
            );
          }}
        />
      </div>
    );
  }
}

Number.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default Number;
