import React from 'react';
import PropTypes from 'prop-types';

import { create } from '../../../../global/CT-UI-Form/form';

import Fill from './stylefield/fill/Fill';
import FillImg from './stylefield/fillimg/FillImg';

import Emitter from '../../../../../util/Emitter';
import Actions from '../../../../../util/Actions';

import PageModel from '../../../../../model/PageModel';

import './CanvasTabPanelPropertyStyleTab.less';

const selectorPrefix = 'CanvasTabPanelPropertyStyleTab';

const config = [
  {
    // 填充
    name: 'fill',
    type: 'fill',
    Component: Fill,
  },
  {
    // 填充图片
    name: 'fillimg',
    type: 'fillimg',
    Component: FillImg,
  },
];

/**
 * CanvasTabPanelPropertyStyleTab
 * @class CanvasTabPanelPropertyStyleTab
 * @classdesc 属性面板中的样式面板
 */
class CanvasTabPanelPropertyStyleTab extends React.Component {
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
    Emitter.on(Actions.components.business.pagepanel.stylechange, this.onShapeStyleChange);
  }

  componentWillUnmount() {
    Emitter.remove(Actions.components.business.pagepanel.stylechange, this.onShapeStyleChange);
  }

  /**
   * onShapeStyleChange
   * @param {String} - pageId
   */
  onShapeStyleChange({
    pageId,
  }) {
    this.setState({
      shape: PageModel.get(pageId),
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

CanvasTabPanelPropertyStyleTab.propTypes = {
  shape: PropTypes.object,
};

export default create(CanvasTabPanelPropertyStyleTab);
