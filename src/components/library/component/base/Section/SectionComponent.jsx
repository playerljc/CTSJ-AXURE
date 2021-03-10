import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './SectionComponent.less';

/**
 * SectionComponent
 * @class SectionComponent
 * @classdesc SectionComponent
 */
class SectionComponent extends React.PureComponent {
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

SectionComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

SectionComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(SectionComponent, {
    groupKey: 'base',
    componentKey: 'Section',
  }),
);
