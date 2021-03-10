import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './IconTool.less';

/**
 * IconTool
 * @class IconTool
 * @classdesc IconTool
 */
class IconTool extends React.PureComponent {
  render() {
    const { selectorPrefix, attribute = '{}' } = this.props;

    const attrJSON = JSON.parse(attribute);

    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-icons-Icon`}>
          <i className={`fas fa-${attrJSON.value}`} />
        </div>
      </React.Fragment>
    );
  }
}

IconTool.defaultProps = {
  selectorPrefix: '',
};

IconTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(IconTool, {
  groupKey: 'icons',
  componentKey: 'Icon',
});
