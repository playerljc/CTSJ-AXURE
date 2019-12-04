import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './EllipseTool.less';

/**
 * Ellipse
 * @class EllipseTool
 * @classdesc Ellipse
 */
class EllipseTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-ellipse`} />
      </React.Fragment>
    );
  }
}

EllipseTool.defaultProps = {
  selectorPrefix: '',
};

EllipseTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(EllipseTool, {
  groupKey: 'base',
  componentKey: 'Ellipse',
});
