import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './ButtonTool.less';

/**
 * Button
 * @class ButtonTool
 * @classdesc Button
 */
class ButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-button`}>BUTTON</div>
      </>
    );
  }
}

ButtonTool.defaultProps = {
  selectorPrefix: '',
};

ButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(ButtonTool, {
  groupKey: 'base',
  componentKey: 'Button',
});
