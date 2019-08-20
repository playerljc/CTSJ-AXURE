import React from 'react';
import SplitFactory from '../../global/CT-UI-Split/split';
import InteractivePanel from '../InteractivePanel/InteractivePanel';
import AbstractPanel from '../AbstractPanel/AbstractPanel';
import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';
import Model from '../../../model/Model';
import './PropertyPanel.less';

const { Component } = React;

/**
 * PropertyPanel
 * @class PropertyPanel
 * @classdesc PropertyPanel
 */
class PropertyPanel extends Component {
  /**
   * constructor
   * @param {Object} - props
   */
  constructor(props) {
    super(props);

    this.onComponentActive = this.onComponentActive.bind(this);

    this.state = {
      pageId: '',
      componentId: '',
    };
  }

  componentDidMount() {
    Emitter.on(Actions.components.library.component.active, this.onComponentActive);
    SplitFactory.create(this.el, {
      direction: 'vertical',
    });
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.library.component.active, this.onComponentActive);
  }

  /**
   * onComponentActive
   * @param {Object} - params
   */
  onComponentActive(params) {
    this.setState({
      ...params,
    });
  }

  render() {
    return (
      <div
        className="ct-split"
        ref={(el) => {
        this.el = el;
      }}
      >
        <div className="ct-split-top">
          <InteractivePanel {...this.state} />
        </div>
        <div className="ct-split-main">
          <AbstractPanel />
        </div>
      </div>
    );
  }
}

export default PropertyPanel;
