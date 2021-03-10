import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
        <div className={`${selectorPrefix}-form-list FontAwesome`}>&#xe684;</div>
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

export default ComponentToolBaseHOC(ListTool, {
  groupKey: 'form',
  componentKey: 'List',
});
