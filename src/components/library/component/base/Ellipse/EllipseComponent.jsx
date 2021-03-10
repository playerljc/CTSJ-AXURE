import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './EllipseComponent.less';

/**
 * EllipseComponent
 * @class EllipseComponent
 * @classdesc EllipseComponent
 */
class EllipseComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: { text },
      },
      style: { alignStyle },
    } = this.props;

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} style={alignStyle}>
        {text}
      </div>
    );
  }
}

EllipseComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

EllipseComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(EllipseComponent, {
    groupKey: 'base',
    componentKey: 'Ellipse',
  }),
);
