import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './SectionTool.less';

/**
 * SectionTool
 * @class SectionTool
 * @classdesc SectionTool
 */
class SectionTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-Section FontAwesome`}>&#xe61d;</div>
      </>
    );
  }
}

SectionTool.defaultProps = {
  selectorPrefix: '',
};

SectionTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(SectionTool, {
  groupKey: 'base',
  componentKey: 'Section',
});
