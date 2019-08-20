import React from 'react';
import PropTypes from 'prop-types';
import Model from '../../../model/Model';
import Register from '../../../components/library/Register';
import './InteractivePanel.less';

const { Component } = React;

/**
 * InteractivePanel
 * @class InteractivePanel
 * @classdesc InteractivePanel
 */
class InteractivePanel extends Component {
  render() {
    const { pageId, componentId } = this.props;
    const shape = Model.getShape({ pageId, componentId });
    const el = shape ? shape.getEl() : null;
    const groupKey = el ? el.dataset.groupkey : null;
    const componentKey = el ? el.dataset.componentkey : null;
    const PropertyComponent = groupKey && componentKey ? Register.get(groupKey).get(componentKey) : null;
    return (
      <div>
        {PropertyComponent ? <PropertyComponent.Property shape={shape} /> : null}
      </div>
    );
  }
}

InteractivePanel.defaultProps = {
  pageId: '',
  componentId: '',
};

InteractivePanel.propTypes = {
  pageId: PropTypes.string,
  componentId: PropTypes.string,
};

export default InteractivePanel;
