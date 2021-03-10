import React from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../../global/CT-UI-Form/textarea';

import './Text.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Text';

/**
 * Text
 * @class Text
 * @classdesc 文本
 */
class Text extends React.PureComponent {
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
        <TextArea
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

Text.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Text;
