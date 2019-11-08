import React from 'react';
import uuidv1 from 'uuid/v1';
import Accordion from '../../global/CT-UI-Accordion/Accordion';
import AccordionItem from '../../global/CT-UI-Accordion/AccordionItem';
import Register from '../Register';
import Config from './Toolbox.json';
import './ToolBox.less';

const selectorPrefix = 'ToolBox';

/**
 * ToolBox
 * @class ToolBox
 * @classdesc ToolBox
 */
class ToolBox extends React.PureComponent {
  renderInner() {
    const result = [];
    Config.forEach((group) => {
      const { groupName, key: groupKey, components } = group;
      // 分类名
      result.push(
        <AccordionItem key={groupKey} name={groupName} open >
          <div className="g-grid-list column2">
            {
              components.map(({ name: comName, key: componentKey }) => {
                const Component = Register.get(groupKey).get(componentKey);
                return (
                  <div key={uuidv1()} className="g-grid-list-item">
                    <Component.Tool name={comName} />
                  </div>
                );
              })
            }
          </div>
        </AccordionItem>
      );
    });
    return result;
  }

  render() {
    return (
      <div className={`${selectorPrefix}`} >
        <Accordion>
          {this.renderInner()}
        </Accordion>
      </div>
    );
  }
}

export default ToolBox;
