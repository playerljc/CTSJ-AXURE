import React from 'react';
import FormFieldHOC from './FormFieldHOC';
import FormFieldMouseDonwCaptureHOC from './FormFieldMouseDonwCaptureHOC';

class Input extends React.PureComponent {
  render() {
    return <input {...this.props} />;
  }
}

export default FormFieldHOC(FormFieldMouseDonwCaptureHOC(Input));
