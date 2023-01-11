import React from 'react';
import PropTypes from 'prop-types';

import TreeEditorHOC from './TreeEditorHOC';

/**
 * TreeTextFieldEditor
 * @class TreeTextFieldEditor
 * @classdesc TreeTextFieldEditor
 */
class TreeTextFieldEditor extends React.PureComponent {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  /**
   * onInputChange
   * @param e
   */
  onInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  /**
   * onInputBlur
   */
  onInputBlur() {
    const { value = '' } = this.state;
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(value);
    }
  }

  /**
   * getOtherProps
   * @return {Object}
   */
  getOtherProps() {
    const { value, context, onBlur, ...otherProps } = this.props;
    return otherProps;
  }

  render() {
    const { value = '' } = this.state;
    const otherProps = this.getOtherProps();
    return (
      <input
        autoFocus
        value={value}
        onKeyDownCapture={(e) => {
          e.stopPropagation();
        }}
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
        {...otherProps}
      />
    );
  }
}

TreeTextFieldEditor.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
  onBlur: PropTypes.func,
};

export default TreeEditorHOC(TreeTextFieldEditor);
