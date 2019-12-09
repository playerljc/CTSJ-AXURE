import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './SubmitComponent.less';

/**
 * SubmitComponent
 * @class SubmitComponent
 * @classdesc SubmitComponent
 */
class SubmitComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
      >Submit
      </div>
    );
  }
}

SubmitComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

SubmitComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(SubmitComponent, {
  groupKey: 'form',
  componentKey: 'Submit',
}));
