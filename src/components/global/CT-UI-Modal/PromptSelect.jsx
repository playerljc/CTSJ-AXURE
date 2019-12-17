import React from 'react';
import PropTypes from 'prop-types';

import { selectorPrefix } from './ModalComponent';

import './PromptSelect.less';

/**
 * PromptSelect
 * @class PromptSelect
 * @classdesc PromptSelect
 */
class PromptSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue,
    });
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const {
      content,
      required = true,
      data = [],
    } = this.props;

    const { value } = this.state;

    return (
      <div className={`${selectorPrefix}-PromptSelect`}>
        <div className={`${selectorPrefix}-PromptSelect-Content`}>{content}</div>
        <select
          className={`${selectorPrefix}-PromptSelect-Select ${required && !value ? 'error' : ''}`}
          value={value}
          onChange={(e) => {
            this.setState({
              value: e.target.value.trim(),
            });
          }}
        >
          {data.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {required && !value ? <div className={`${selectorPrefix}-PromptSelect-Error`}>The field is required！</div> : null}
      </div>
    );
  }
}

PromptSelect.propTypes = {
  defaultValue: PropTypes.string,
  data: PropTypes.array,
  content: PropTypes.node,
  required: PropTypes.bool,
};

export default PromptSelect;
