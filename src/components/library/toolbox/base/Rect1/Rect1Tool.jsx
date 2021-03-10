import React from 'react';
import PropTypes from 'prop-types';
import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';
import './Rect1Tool.less';

/**
 * Rect1
 * @class Rect1Tool
 * @classdesc Rect1
 */
class Rect1Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-rect1`} />
      </>
    );
  }
}

Rect1Tool.defaultProps = {
  selectorPrefix: '',
};

Rect1Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(Rect1Tool, {
  groupKey: 'base',
  componentKey: 'Rect1',
});
