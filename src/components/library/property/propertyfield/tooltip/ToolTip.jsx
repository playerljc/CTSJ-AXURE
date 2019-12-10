import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './ToolTip.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-ToolTip';

/**
 * ToolTip
 * @class ToolTip
 * @classdesc 提示
 */
class ToolTip extends React.PureComponent {
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
      <div className={`${selectorPrefix}`}>
        <Input
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim();
            this.setState({
              value: v,
            }, () => {
              onChange(v);
            });
          }}
        />
      </div>
    );
  }
}

ToolTip.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ToolTip;
