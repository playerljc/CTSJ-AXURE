import React from 'react';
import PropTypes from 'prop-types';
import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';
import './Rect2Tool.less';

/**
 * Rect2
 * @class Rect2Tool
 * @classdesc Rect2
 */
class Rect2Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-rect2`} />
      </>
    );
  }
}

Rect2Tool.defaultProps = {
  selectorPrefix: '',
};

Rect2Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(Rect2Tool, {
  groupKey: 'base',
  componentKey: 'Rect2',
});
