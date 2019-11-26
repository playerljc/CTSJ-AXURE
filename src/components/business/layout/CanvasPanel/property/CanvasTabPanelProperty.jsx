// /**
//  * CanvasTabPanelProperty
//  */
// class CanvasTabPanelProperty extends React.PureComponent {
//   render() {
//     return (
//       <div className={`${selectorPrefix}`} >
//         {this.props.page.getPageId()}
//       </div>
//     );
//   }
// }
//
// CanvasTabPanelProperty.defaultProps = {
//   page: null,
// };
//
// CanvasTabPanelProperty.propTypes = {
//   page: PropTypes.object,
// };
//
// export default CanvasTabPanelProperty;

import React from 'react';
import PropTypes from 'prop-types';

import Tab from '../../../../global/CT-UI-Tab/Tab';
import TabPanel from '../../../../global/CT-UI-Tab/TabPanel';
import CanvasTabPanelPropertyTab from './CanvasTabPanelPropertyTab';
import CanvasTabPanelPropertyStyleTab from './CanvasTabPanelPropertyStyleTab';
import ComponentPropertyDescriptionTab from '../../../../library/property/ComponentPropertyDescriptionTab';

import './CanvasTabPanelProperty.less';

const selectorPrefix = 'CanvasTabPanelProperty';

/**
 * CanvasTabPanelProperty
 * @class CanvasTabPanelProperty
 * @classdesc CanvasTabPanelProperty
 */
class CanvasTabPanelProperty extends React.PureComponent {
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
    const { page } = this.props;
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
          <CanvasTabPanelPropertyTab shape={page} />
        </TabPanel>
        <TabPanel name="Description" key="Description">
          {/* 说明面板 */}
          {/*<ComponentPropertyDescriptionTab shape={page} />*/}
        </TabPanel>
        <TabPanel name="Style" key="Style">
          {/* 样式面板 */}
          <CanvasTabPanelPropertyStyleTab shape={page} />
        </TabPanel>
      </Tab>
    );
  }
}

CanvasTabPanelProperty.defaultProps = {
  page: null,
};

CanvasTabPanelProperty.propTypes = {
  page: PropTypes.object,
};

export default CanvasTabPanelProperty;

