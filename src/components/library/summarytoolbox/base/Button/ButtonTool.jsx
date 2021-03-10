import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './ButtonTool.less';

/**
 * Button
 * @class ButtonTool
 * @classdesc Button
 */
class ButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-Button`}>BUTTON</div>
      </>
    );
  }
}

ButtonTool.defaultProps = {
  selectorPrefix: '',
};

ButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(ButtonTool, {
  groupKey: 'base',
  componentKey: 'Button',
});
