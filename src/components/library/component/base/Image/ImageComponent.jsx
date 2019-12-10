import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './ImageComponent.less';

import defaultImg from '../../../../../res/images/fa-tupian.svg';

/**
 * ImageComponent
 * @class ImageComponent
 * @classdesc ImageComponent
 */
class ImageComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          base64,
        },
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        style={{ backgroundImage: `url(${base64 || defaultImg})` }}
      />
    );
  }
}

ImageComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

ImageComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ImageComponent, {
  groupKey: 'base',
  componentKey: 'Image',
}));
