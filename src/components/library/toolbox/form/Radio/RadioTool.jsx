import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './RadioTool.less';

/**
 * Radio
 * @class RadioTool
 * @classdesc Radio
 */
class RadioTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-form-Radio FontAwesome`}>&#xe631;</div>
      </>
    );
  }
}

RadioTool.defaultProps = {
  selectorPrefix: '',
};

RadioTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(RadioTool, {
  groupKey: 'form',
  componentKey: 'Radio',
});
