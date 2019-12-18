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
      <React.Fragment>
        <div className={`${selectorPrefix}-base-Section FontAwesome`} >&#xe61d;</div>
      </React.Fragment>
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
