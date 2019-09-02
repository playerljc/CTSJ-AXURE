import React from 'react';
import PropTypes from 'prop-types';
import TableEditorHOC from './TableEditorHOC';

/**
 * TableTextFieldEditor
 * @class TableTextFieldEditor
 * @classdesc TableTextFieldEditor
 */
class TableTextFieldEditor extends React.Component {
  /**
   * constructor
   * @param {Object} - props
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
   * @param {Event} - e
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
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
        {...otherProps}
      />
    );
  }
}

TableTextFieldEditor.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
  onBlur: PropTypes.func,
};

export default TableEditorHOC(TableTextFieldEditor);
