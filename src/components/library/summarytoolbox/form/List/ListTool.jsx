import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './ListTool.less';

/**
 * ListTool
 * @class ListTool
 * @classdesc ListTool
 */
class ListTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-form-list fa fa-custom-square`} />
      </React.Fragment>
    );
  }
}

ListTool.defaultProps = {
  selectorPrefix: '',
};

ListTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(ListTool, {
  groupKey: 'form',
  componentKey: 'List',
});
