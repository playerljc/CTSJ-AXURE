import React from 'react';
import PropTypes from 'prop-types';

import { create } from '../../global/CT-UI-Form/form';

import Position from './stylefield/position/Position';
import Dimension from './stylefield/dimension/Dimension';
import Fill from './stylefield/fill/Fill';
import ShadowBack from './stylefield/shadow/Shadow';
import Border from './stylefield/border/Border';
import Radius from './stylefield/radius/Radius';
import Opacity from './stylefield/opacity/Opacity';
import FontFamily from './stylefield/fontfamily/FontFamily';
import LineHeight from './stylefield/lineHeight/LineHeight';
import ZIndex from './stylefield/zindex/ZIndex';
import Align from './stylefield/align/Align';

import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';

import './ComponentPropertyStyleTab.less';
import ShapeModel from '../../../model/ShapeModel';

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
    Component: ShadowBack,
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
  {
    // 对齐
    name: 'align',
    type: 'align',
    Component: Align,
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

    this.state = {
      shape: props.shape,
    };

    // 组件的style发生变化
    this.onShapeStyleChange = this.onShapeStyleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shape: nextProps.shape,
    });
  }

  componentDidMount() {
    Emitter.on(Actions.components.library.component.stylechange, this.onShapeStyleChange);
  }

  componentWillUnmount() {
    Emitter.remove(Actions.components.library.component.stylechange, this.onShapeStyleChange);
  }

  /**
   * onShapeStyleChange
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onShapeStyleChange({
    pageId,
    componentId,
  }) {
    this.setState({
      shape: ShapeModel.getShape({ pageId, componentId }),
    });
  }

  /**
   * renderField
   * @param {String} - name 组件的名字
   * @param {String} - type 组件的类型
   * @param {ReactElement} - Component 被包装的组件
   * @return {ReactElement}
   */
  renderField({ name, type, Component }) {
    const { form } = this.props;
    const { shape } = this.state;
    const FiledComponent = form.createField(Component, type);

    const defaultValue = shape.getProperty().style[type];

    return (
      <tr
        className="g-listview-item"
        key={type}
      >
        <td className={`${selectorPrefix}-GridList-Label`}>{name}</td>
        <td className={`${selectorPrefix}-GridList-Value`}>
          <FiledComponent
            value={defaultValue}
            onChange={(value) => {
              const style = shape.getProperty().style;
              style[type] = value;
              shape.setPropertyByProps('style', style);
            }}
          />
        </td>
      </tr>
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
      <table className={`${selectorPrefix}-GridList`} cellPadding={20} >
        <tbody>
          {fieldElementArr}
        </tbody>
      </table>
    );
  }

  render() {
    const { form } = this.props;
    form.clear();

    return (
      <div className={`${selectorPrefix}`}>
        {this.renderFields()}
      </div>
    );
  }
}

ComponentPropertyStyleTab.propTypes = {
  shape: PropTypes.object,
};

export default create(ComponentPropertyStyleTab);
