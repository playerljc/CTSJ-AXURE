import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';
import './SelectComponent.less';

/**
 * SelectComponent
 * @class SelectComponent
 * @classdesc SelectComponent
 */
class SelectComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <select
          className={`${selectorPrefix}-${groupKey}-${componentKey}-select`}
        />
      </div>
    );
  }
}

SelectComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

SelectComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(SelectComponent, {
  groupKey: 'form',
  componentKey: 'Select',
}));
