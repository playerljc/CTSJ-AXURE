import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';
import './Rect3Component.less';

/**
 * Rect3Component
 * @class Rect3Component
 * @classdesc Rect3Component
 */
class Rect3Component extends React.Component {
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} />
    );
  }
}

Rect3Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

Rect3Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(Rect3Component, {
  groupKey: 'base',
  componentKey: 'Rect3',
}));
