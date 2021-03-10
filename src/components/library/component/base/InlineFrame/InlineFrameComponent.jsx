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
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: { text },
      },
      style: { alignStyle },
    } = this.props;

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} style={alignStyle}>
        {text}
      </div>
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
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(InlineFrameComponent, {
    groupKey: 'base',
    componentKey: 'InlineFrame',
  }),
);
