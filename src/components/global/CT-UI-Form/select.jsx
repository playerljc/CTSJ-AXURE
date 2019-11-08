import React from 'react';
import FormFieldHOC from './FormFieldHOC';

class Select extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <select {...props} >
        {children}
      </select>
    );
  }
}

export default FormFieldHOC(Select);
