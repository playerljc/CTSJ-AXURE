import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './PrimaryButtonTool.less';

/**
 * PrimaryyButtonTool
 * @class PrimaryyButtonTool
 * @classdesc PrimaryyButtonTool
 */
class PrimaryyButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-primarybutton`}>BUTTON</div>
      </>
    );
  }
}

PrimaryyButtonTool.defaultProps = {
  selectorPrefix: '',
};

PrimaryyButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(PrimaryyButtonTool, {
  groupKey: 'base',
  componentKey: 'PrimaryButton',
});
