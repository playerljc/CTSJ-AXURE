import React from 'react';
import FormFieldHOC from './FormFieldHOC';
import FormFieldMouseDonwCaptureHOC from './FormFieldMouseDonwCaptureHOC';

class TextArea extends React.PureComponent {
  render() {
    return (
      <textarea {...this.props} />
    );
  }
}

export default FormFieldHOC(FormFieldMouseDonwCaptureHOC(TextArea));
