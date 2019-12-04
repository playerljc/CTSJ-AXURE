import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './ImageProperty.less';

/**
 * ImageProperty
 * @class ImageProperty
 * @classdesc ImageProperty
 */
class ImageProperty extends React.PureComponent {
  render() {
    return (
      <div>ImageProperty</div>
    );
  }
}

ImageProperty.defaultProps = {

};

ImageProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(ImageProperty);
