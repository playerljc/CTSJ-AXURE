import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './ListComponent.less';

/**
 * ListComponent
 * @class ListComponent
 * @classdesc ListComponent
 */
class ListComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <select
          className={`${selectorPrefix}-${groupKey}-${componentKey}-list`}
        />
      </div>
    );
  }
}

ListComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

ListComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ListComponent, {
  groupKey: 'form',
  componentKey: 'List',
}));
