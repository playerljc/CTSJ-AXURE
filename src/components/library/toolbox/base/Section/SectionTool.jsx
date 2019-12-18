import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
        <div className={`${selectorPrefix}-base-section FontAwesome`} >&#xe61d;</div>
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

export default ComponentToolBaseHOC(SectionTool, {
  groupKey: 'base',
  componentKey: 'Section',
});
