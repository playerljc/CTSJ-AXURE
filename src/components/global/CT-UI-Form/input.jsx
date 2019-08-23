import React from 'react';
import FormFieldHOC from './FormFieldHOC';

class Input extends React.Component {
  render() {
    return (
      <input {...this.props} />
    );
  }
}

export default FormFieldHOC(Input);
