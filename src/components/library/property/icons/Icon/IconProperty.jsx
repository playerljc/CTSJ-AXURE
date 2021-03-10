import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

// import Text from '../../propertyfield/text/Text';
import ToolTip from '../../propertyfield/tooltip/ToolTip';

import './IconProperty.less';

const selectorPrefix = 'IconProperty';

/**
 * IconProperty
 * @class IconProperty
 * @classdesc IconProperty
 */
class IconProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const {
      // text,
      tooltip,
    } = shape.getProperty().prop;

    return [
      {
        key: 'Interaction',
        name: 'Interaction',
        Component: null,
      },
      // {
      //   key: 'Text',
      //   name: 'Text',
      //   Component: (
      //     <Text
      //       value={text}
      //       onChange={(value) => {
      //         const prop = shape.getProperty().prop;
      //         prop.text = value;
      //         shape.setPropertyByProps('prop', prop);
      //       }}
      //     />
      //   ),
      // },
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

IconProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(IconProperty);
