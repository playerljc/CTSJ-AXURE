import React from 'react';
import PropTypes from 'prop-types';

import Tab from '../../global/CT-UI-Tab/Tab';
import TabPanel from '../../global/CT-UI-Tab/TabPanel';
import AccordionItem from '../../global/CT-UI-Accordion/AccordionItem';
import Accordion from '../../global/CT-UI-Accordion/Accordion';

import ComponentPropertyDescriptionTab from './ComponentPropertyDescriptionTab';
import ComponentPropertyStyleTab from './ComponentPropertyStyleTab';

import './ComponentPropertyHOC.less';


const selectorPrefix = 'ComponentPropertyHOC';

/**
 * ComponentPropertyHOC
 * @param PropertyTabComponent
 * @return {ReactElement}
 */
export default (PropertyTabComponent) => {
  /**
   * ComponentPropertyHOC
   * @class ComponentPropertyHOC
   * @classdesc ComponentPropertyHOC
   */
  class ComponentPropertyHOC extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeKey: 'Property',
      };
    }

    onChange = (activeKey) => {
      this.setState({
        activeKey,
      });
    };

    render() {
      const { shape } = this.props;
      const { activeKey } = this.state;

      return (
        <Tab
          className={`${selectorPrefix}`}
          activeKey={activeKey}
          onChange={this.onChange}
          canRemove={false}
        >
          <TabPanel name="Property" key="Property">
            {/* 属性面板 */}
            <PropertyTabComponent shape={shape}>
              {(config) => {
                return (
                  <Accordion className="Fresh">
                    {config.map(({ key, name, Component }) => (
                      <AccordionItem
                        key={key}
                        name={name}
                        open
                      >{Component}
                      </AccordionItem>
                    ))}
                  </Accordion>
                );
              }}
            </PropertyTabComponent>
          </TabPanel>
          <TabPanel name="Description" key="Description">
            {/* 说明面板 */}
            <ComponentPropertyDescriptionTab shape={shape} />
          </TabPanel>
          <TabPanel name="Style" key="Style">
            {/* 样式面板 */}
            <ComponentPropertyStyleTab shape={shape} />
          </TabPanel>
        </Tab>
      );
    }
  }

  ComponentPropertyHOC.propTypes = {
    shape: PropTypes.object,
  };

  return ComponentPropertyHOC;
};
