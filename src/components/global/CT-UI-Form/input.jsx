import React from 'react';
import FormFieldHOC from './FormFieldHOC';
import FormFieldMouseDonwCaptureHOC from './FormFieldMouseDonwCaptureHOC';

class Input extends React.Component {
  render() {
    return (
      <input {...this.props} />
    );
  }
}

export default FormFieldHOC(FormFieldMouseDonwCaptureHOC(Input));
