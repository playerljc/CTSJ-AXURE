import React from 'react';
import PropTypes from 'prop-types';
import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';
import './Rect3Tool.less';

/**
 * Rect3
 * @class Rect3Tool
 * @classdesc Rect3
 */
class Rect3Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-rect3`} />
      </>
    );
  }
}

Rect3Tool.defaultProps = {
  selectorPrefix: '',
};

Rect3Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(Rect3Tool, {
  groupKey: 'base',
  componentKey: 'Rect3',
});
