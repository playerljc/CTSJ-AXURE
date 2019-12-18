import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

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
      <React.Fragment>
        <div className={`${selectorPrefix}-base-Text FontAwesome`}>&#xe61c;</div>
      </React.Fragment>
    );
  }
}

TextTool.defaultProps = {
  selectorPrefix: '',
};

TextTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(TextTool, {
  groupKey: 'base',
  componentKey: 'Text',
});
