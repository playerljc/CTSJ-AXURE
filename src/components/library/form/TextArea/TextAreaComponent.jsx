import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragResizeHOC';
import './TextAreaComponent.less';

/**
 * TextAreaComponent
 * @class TextAreaComponent
 * @classdesc TextAreaComponent
 */
class TextAreaComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <textarea
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

export default ComponentBase(Drag(TextAreaComponent, {
  groupKey: 'form',
  componentKey: 'TextArea',
}));
