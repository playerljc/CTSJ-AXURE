import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './InlineFrameTool.less';

/**
 * InlineFrame
 * @class InlineFrameTool
 * @classdesc InlineFrame
 */
class InlineFrameTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-InlineFrame FontAwesome`}>&#xe74c;</div>
      </>
    );
  }
}

InlineFrameTool.defaultProps = {
  selectorPrefix: '',
};

InlineFrameTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(InlineFrameTool, {
  groupKey: 'base',
  componentKey: 'InlineFrame',
});
