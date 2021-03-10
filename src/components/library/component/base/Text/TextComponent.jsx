import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './TextComponent.less';

/**
 * TextComponent
 * @class TextComponent
 * @classdesc TextComponent
 */
class TextComponent extends React.PureComponent {
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

TextComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TextComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(TextComponent, {
    groupKey: 'base',
    componentKey: 'Text',
  }),
);
