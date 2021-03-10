import React from 'react';
import PropTypes from 'prop-types';

import { selectorPrefix } from './ModalComponent';

import './PromptCheckbox.less';

/**
 * PromptCheckbox
 * @class PromptCheckbox
 * @classdesc PromptCheckbox
 */
class PromptCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
    });
  }

  getValue() {
    return this.state.checked;
  }

  render() {
    const { content } = this.props;

    const { checked } = this.state;

    return (
      <div className={`${selectorPrefix}-PromptCheckbox`}>
        <div className={`${selectorPrefix}-PromptCheckbox-Content`}>{content}</div>
        <input
          type="checkbox"
          className={`${selectorPrefix}-PromptCheckbox-Checkbox`}
          checked={checked}
          onChange={(e) => {
            this.setState({
              checked: e.target.checked,
            });
          }}
        />
      </div>
    );
  }
}

PromptCheckbox.propTypes = {
  checked: PropTypes.bool,
  content: PropTypes.node,
};

export default PromptCheckbox;
