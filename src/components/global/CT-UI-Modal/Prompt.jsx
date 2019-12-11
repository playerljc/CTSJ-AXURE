import React from 'react';
import PropTypes from 'prop-types';

import { selectorPrefix } from './ModalComponent';

import './Prompt.less';

/**
 * Prompt
 * @class Prompt
 * @classdesc Prompt
 */
class Prompt extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      value: props.defaultValue,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     value: nextProps.defaultValue,
  //   });
  // }

  getValue() {
    return this.state.value;
  }

  render() {
    const {
      content,
      required = true,
      maxLength,
    } = this.props;

    const { value } = this.state;

    return (
      <div className={`${selectorPrefix}-Prompt`}>
        <div className={`${selectorPrefix}-Prompt-Content`}>{content}</div>
        <input
          className={`${selectorPrefix}-Prompt-Input ${required && !value ? 'error' : ''}`}
          type="text"
          value={value}
          maxLength={maxLength}
          onKeyDownCapture={(e) => { e.stopPropagation(); }}
          onChange={(e) => {
            this.setState({
              value: e.target.value.trim(),
            });
          }}
        />
        {required && !value ? <div className={`${selectorPrefix}-Prompt-Error`}>The field is required！</div> : null}
      </div>
    );
  }
}

Prompt.propTypes = {
  defaultValue: PropTypes.string,
  content: PropTypes.node,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default Prompt;
