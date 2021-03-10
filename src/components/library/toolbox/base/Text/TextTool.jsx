import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './TextTool.less';

/**
 * TextTool
 * @class TextTool
 * @classdesc TextTool
 */
class TextTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-text FontAwesome`}>&#xe61c;</div>
      </>
    );
  }
}

TextTool.defaultProps = {
  selectorPrefix: '',
};

TextTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(TextTool, {
  groupKey: 'base',
  componentKey: 'Text',
});
