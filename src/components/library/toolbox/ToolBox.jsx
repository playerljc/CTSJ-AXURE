import React from 'react';
import uuidv1 from 'uuid/v1';

import Accordion from '../../global/CT-UI-Accordion/Accordion';
import AccordionItem from '../../global/CT-UI-Accordion/AccordionItem';
import Register from '../Register';
import ToolBoxConfig from './Toolbox.config';

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
    ToolBoxConfig.forEach((group) => {
      const { groupName, key: groupKey, components } = group;

      // 分类名
      result.push(
        <AccordionItem key={uuidv1()} name={groupName} open>
          <div className="g-grid-list column2">
            {components.map(({ name: comName, key: componentKey, attribute = {} }) => {
              const Component = Register.get(groupKey).get(componentKey);
              return (
                <div key={uuidv1()} className="g-grid-list-item">
                  {/* TODO:初始化Tool */}
                  <Component.Tool name={comName} attribute={attribute} />
                </div>
              );
            })}
          </div>
        </AccordionItem>,
      );
    });
    return result;
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <Accordion className="Fresh">{this.renderInner()}</Accordion>
      </div>
    );
  }
}

export default ToolBox;
