import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Menu from './Menu';
import { ProviderContext } from './ContextMenuContext';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './ContextMenu.less';

const selectorPrefix = 'CT-UI-ContextMenu';

/**
 * ContextMenuComponent
 * @class ContextMenuComponent
 * @classdesc ContextMenuComponent
 */
class ContextMenuComponent extends React.PureComponent {
  render() {
    const { data = [], config, el } = this.props;
    return (
      <ProviderContext.Provider
        value={{ config, el }}
      >
        <div
          className={`${selectorPrefix}`}
          style={{ zIndex: getMaxLevelNumber() * 2 }}
          onClick={() => {
            const flag = ReactDOM.unmountComponentAtNode(el);
            if (flag) {
              el.parentElement.removeChild(el);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            const flag = ReactDOM.unmountComponentAtNode(el);
            if (flag) {
              el.parentElement.removeChild(el);
            }
          }}
        >
          <Menu data={data} />
        </div>
      </ProviderContext.Provider>
    );
  }
}

ContextMenuComponent.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  el: PropTypes.any,
};

const ContextMenu = {
  /**
   * config
   * @param {Array<Object>} - data
   * {
   *   name - {String} 名字
   *   icon - {String} 图标
   *   separation - {Bolean} 分割线
   *   attribute - {Object} 自定义属性
   *   children - {Array<Object> 孩子
   *   id - {String} 唯一的id
   *   disabled - {Boolean} 不可用
   * }
   * @param {Object} - config
   *{
   *   width - {Number} 宽度
   *   handler - {Function} 点击的事件句柄
   *   x - {Number} 显示的x坐标 相对于body
   *   y - {Number} 现实的y坐标 相对于body
   *   maskClosable - {Boolean} 点击其他位置是否关闭菜单
   * }
   * @return {HTMLDivElement}
   */
  open(data, config) {
    config = Object.assign({ width: 200, maskClosable: true }, config);

    const parentEl = document.createElement('div');

    ReactDOM.render(
      <ContextMenuComponent data={data} config={config} el={parentEl} />,
      parentEl,
    );

    document.body.appendChild(parentEl);

    return parentEl;
  },
  close(el) {
    const flag = ReactDOM.unmountComponentAtNode(el);
    if (flag) {
      el.parentElement.removeChild(el);
    }
  },
};

export default ContextMenu;
