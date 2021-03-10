import React from 'react';
import PropTypes from 'prop-types';
import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';
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

export default ComponentToolBaseHOC(SelectTool, {
  groupKey: 'form',
  componentKey: 'Select',
});
