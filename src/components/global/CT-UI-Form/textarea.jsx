import React from 'react';
import FormFieldHOC from './FormFieldHOC';

class TextArea extends React.Component {
  render() {
    return (
      <textarea {...this.props} />
    );
  }
}

export default FormFieldHOC(TextArea);
