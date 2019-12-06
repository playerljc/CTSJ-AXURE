import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './InlineFrameComponent.less';

/**
 * InlineFrameComponent
 * @class InlineFrameComponent
 * @classdesc InlineFrameComponent
 */
class InlineFrameComponent extends React.PureComponent {
  /**
   * getStyle
   * @return {Object}
   */
  getStyle() {
    const {
      property: {
        style: {
          fill: {
            backgroundColor,
          },
        },
      },
    } = this.props;

    return {
      backgroundColor,
    };
  }

  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        style={this.getStyle()}
      />
    );
  }
}

InlineFrameComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

InlineFrameComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(InlineFrameComponent, {
  groupKey: 'base',
  componentKey: 'InlineFrame',
}));
