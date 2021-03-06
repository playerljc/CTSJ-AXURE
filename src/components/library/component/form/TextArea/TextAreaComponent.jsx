import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DragResizeHOC from '../../DragResizeHOC';
import './TextAreaComponent.less';

/**
 * TextAreaComponent
 * @class TextAreaComponent
 * @classdesc TextAreaComponent
 */
class TextAreaComponent extends React.Component {
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <textarea
          ref={(el) => {
            this.el = el;
          }}
          disabled
          className={`${selectorPrefix}-${groupKey}-${componentKey}-textarea`}
        />
      </div>
    );
  }
}

TextAreaComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TextAreaComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DragResizeHOC(ComponentFocusHOC(TextAreaComponent), {
  groupKey: 'form',
  componentKey: 'TextArea',
}));
