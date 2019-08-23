import React from 'react';
import ToolBox from '../../../library/toolbox/ToolBox';
import './ComponentPanel.less';

const { Component } = React;

const selectorPrefix = 'ComponentPanel';

/**
 * ComponentPanel
 * @class ComponentPanel
 * @classdesc ComponentPanel
 */
class ComponentPanel extends Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <ToolBox />
      </div>
    );
  }
}

export default ComponentPanel;
