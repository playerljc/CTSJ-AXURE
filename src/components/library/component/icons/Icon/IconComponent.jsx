import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './IconComponent.less';

/**
 * IconComponent
 * @class IconComponent
 * @classdesc IconComponent
 */
class IconComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {},
      },
      style: { alignStyle },
      attribute = '{}',
    } = this.props;

    const attrJSON = JSON.parse(attribute);

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} style={alignStyle}>
        {attrJSON.value ? <i className={`fas fa-${attrJSON.value}`} /> : null}
      </div>
    );
  }
}

IconComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

IconComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(IconComponent, {
    groupKey: 'icons',
    componentKey: 'Icon',
  }),
);
