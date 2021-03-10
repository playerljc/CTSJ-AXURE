import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import Img from '../../propertyfield/img/Img';

import './ImageProperty.less';

const selectorPrefix = 'ImageProperty';

/**
 * ImageProperty
 * @class ImageProperty
 * @classdesc ImageProperty
 */
class ImageProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const { base64, tooltip } = shape.getProperty().prop;

    return [
      {
        key: 'Interaction',
        name: 'Interaction',
        Component: null,
      },
      {
        key: 'Text',
        name: 'Text',
        Component: (
          <Img
            value={base64}
            onChange={(value) => {
              const {prop} = shape.getProperty();
              prop.base64 = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'ToolTip',
        name: 'ToolTip',
        Component: (
          <ToolTip
            value={tooltip}
            onChange={(value) => {
              const {prop} = shape.getProperty();
              prop.tooltip = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
    ];
  }

  render() {
    const { children } = this.props;

    return <div className={selectorPrefix}>{children(this.getConfig())}</div>;
  }
}

ImageProperty.defaultProps = {};

ImageProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(ImageProperty);
