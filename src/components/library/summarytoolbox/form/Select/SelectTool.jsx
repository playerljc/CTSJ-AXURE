import React from 'react';
import PropTypes from 'prop-types';
import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';
import './SelectTool.less';

/**
 * Select
 * @class SelectTool
 * @classdesc Select
 */
class SelectTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-form-select FontAwesome`}>&#xe6af;</div>
      </>
    );
  }
}

SelectTool.defaultProps = {
  selectorPrefix: '',
};

SelectTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(SelectTool, {
  groupKey: 'form',
  componentKey: 'Select',
});
