import React from 'react';
import PropTypes from 'prop-types';

import { create } from '../../global/CT-UI-Form/form';

import Position from './stylefield/position/Position';
import Dimension from './stylefield/dimension/Dimension';
import Fill from './stylefield/fill/Fill';
import Shadow from './stylefield/shadow/Shadow';
import Border from './stylefield/border/Border';
import Radius from './stylefield/radius/Radius';
import Opacity from './stylefield/opacity/Opacity';
import FontFamily from './stylefield/fontfamily/FontFamily';
import LineHeight from './stylefield/lineHeight/LineHeight';
import ZIndex from './stylefield/zindex/ZIndex';

import './ComponentPropertyStyleTab.less';

const selectorPrefix = 'ComponentPropertyStyleTab';

const config = [
  {
    // 位置
    name: 'position',
    type: 'position',
    Component: Position,
  },
  {
    // 尺寸
    name: 'dimension',
    type: 'dimension',
    Component: Dimension,
  },
  {
    // 填充
    name: 'fill',
    type: 'fill',
    Component: Fill,
  },
  {
    // 阴影
    name: 'shadow',
    type: 'shadow',
    Component: Shadow,
  },
  {
    // 边框
    name: 'border',
    type: 'border',
    Component: Border,
  },
  {
    // 圆角
    name: 'radius',
    type: 'radius',
    Component: Radius,
  },
  {
    // 透明度
    name: 'opacity',
    type: 'opacity',
    Component: Opacity,
  },
  {
    // 字体
    name: 'fontfamily',
    type: 'fontfamily',
    Component: FontFamily,
  },
  {
    // 行间距
    name: 'lineheight',
    type: 'lineheight',
    Component: LineHeight,
  },
  {
    // 层级
    name: 'zindex',
    type: 'zindex',
    Component: ZIndex,
  },
];

/**
 * ComponentPropertyStyleTab
 * @class ComponentPropertyStyleTab
 * @classdesc 属性面板中的样式面板
 */
class ComponentPropertyStyleTab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  /**
   * renderField
   * @param {String} - name 组件的名字
   * @param {String} - type 组件的类型
   * @param {ReactElement} - Component 被包装的组件
   * @return {ReactElement}
   */
  renderField({ name, type, Component }) {
    const { form, shape } = this.props;
    const FiledComponent = form.createField(Component, type);

    const defaultValue = shape.getProperty().style[type];

    return (
      <li
        className="g-listview-item"
        key={type}
      >
        <div className={`${selectorPrefix}-GridList-Label`}>{name}</div>
        <div className={`${selectorPrefix}-GridList-Value`}>
          <FiledComponent
            value={defaultValue}
            onChange={(value) => {
              const style = shape.getProperty().style;
              style[type] = value;
              shape.setPropertyByProps('style', style);
            }}
          />
        </div>
      </li>
    );
  }

  /**
   * renderFields
   * @return {ReactElement}
   */
  renderFields() {
    const fieldElementArr = [];
    config.forEach((t) => {
      fieldElementArr.push(this.renderField(t));
    });
    return (
      <ul className={`${selectorPrefix}-GridList g-listview`}>{fieldElementArr}</ul>
    );
  }

  render() {
    const { form } = this.props;
    form.clear();

    return (
      <div className={`${selectorPrefix}`}>
        {this.renderFields()}
        {/* <div>ComponentPropertyStyleTab</div> */}
      </div>
    );
  }
}

ComponentPropertyStyleTab.propTypes = {
  shape: PropTypes.object,
};

export default create(ComponentPropertyStyleTab);
