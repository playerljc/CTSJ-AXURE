import React from 'react';
import InteractivePanel from '../InteractivePanel/InteractivePanel';
import SummaryPanel from '../SummaryPanel/SummaryPanel';
import SplitFactory from '../../../global/CT-UI-Split/split';
import './PropertyPanel.less';

const { Component } = React;

const selectorPrefix = 'PropertyPanel';

/**
 * PropertyPanel
 * @class PropertyPanel
 * @classdesc PropertyPanel
 */
class PropertyPanel extends Component {
  componentDidMount() {
    SplitFactory.create(this.el, {
      direction: 'vertical',
    });
  }

  render() {
    return (
      <div
        className={`${selectorPrefix} ct-split`}
        ref={(el) => {
          this.el = el;
        }}
      >
        <div className="ct-split-top">
          {/* 监视 */}
          <InteractivePanel />
        </div>
        <div className="ct-split-main">
          {/* 概要 */}
          <SummaryPanel />
        </div>
      </div>
    );
  }
}

export default PropertyPanel;
