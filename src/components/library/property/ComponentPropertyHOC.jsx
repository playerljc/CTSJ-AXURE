import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../global/Tab/Tab';
import TabPanel from '../../global/Tab/TabPanel';
import ComponentPropertyDescriptionTab from './ComponentPropertyDescriptionTab';
import ComponentPropertyStyleTab from './ComponentPropertyStyleTab';

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

      const { shape } = props;

      this.state = {
        activeKey: 'Property',
        property: shape.getProperty(),
      };
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setState({
        property: nextProps.shape.getProperty(),
      });
    }

    onChange = (activeKey) => {
      this.setState({
        activeKey,
      });
    };

    render() {
      const { shape } = this.props;
      const { activeKey, property } = this.state;
      const { prop, description, style } = property;

      return (
        <Tab
          activeKey={activeKey}
          onChange={this.onChange}
          canRemove={false}
        >
          <TabPanel name="Property" key="Property">
            {/* 属性面板 */}
            <PropertyTabComponent property={prop} shape={shape} />
          </TabPanel>
          <TabPanel name="Description" key="Description">
            {/* 说明面板 */}
            <ComponentPropertyDescriptionTab property={description} shape={shape} />
          </TabPanel>
          <TabPanel name="Style" key="Style">
            {/* 样式面板 */}
            <ComponentPropertyStyleTab property={style} shape={shape} />
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
