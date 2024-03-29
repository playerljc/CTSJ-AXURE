import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './PrimaryButtonTool.less';

/**
 * PrimaryButtonTool
 * @class PrimaryButtonTool
 * @classdesc PrimaryButtonTool
 */
class PrimaryButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-PrimaryButton`}>BUTTON</div>
      </>
    );
  }
}

PrimaryButtonTool.defaultProps = {
  selectorPrefix: '',
};

PrimaryButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(PrimaryButtonTool, {
  groupKey: 'base',
  componentKey: 'PrimaryButton',
});
