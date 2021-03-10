import React from 'react';

import TreeSetting from './TreeSetting';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import Modal from '../CT-UI-Modal/modal';
import MenuTree from '../CT-UI-Tree/MenuTree';

import './TreeSetting.less';

/**
 * VMenuTreeSetting
 * @class VMenuTreeSetting
 * @classdesc 菜单树的设置
 */
class VMenuTreeSetting extends TreeSetting {
  /**
   * initToolConfig
   *  上方添加节点
   *  下方添加节点
   *  添加子节点
   *  删除节点
   *  上移
   *  下移
   *  升级
   *  降级
   *  展开
   *  图标
   *
   *  + 是否是分割线
   *  + 是否是disabled
   */
  initToolConfig() {
    super.initToolConfig();
    this.toolConfig = this.toolConfig.concat([
      // 是否是分割线
      {
        key: 'separation',
        className: () =>
          `fas fa-grip-lines ${
            this.toolConfig.find((t) => t.key === 'separation').disable() ? 'disable' : ''
          }`,
        title: 'separation',
        onClick: () => {
          const disabled = this.toolConfig.find((t) => t.key === 'separation').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const node = this.findNodeById(cloneData, activeKey);

          Modal.promptCheckbox({
            content: 'separation',
            checked: node.separation,
            zIndex: zIndex + 10,
            success: (checked) => {
              return new Promise((resolve) => {
                node.separation = checked;
                this.setState(
                  {
                    data: cloneData,
                  },
                  () => {
                    resolve();
                  },
                );
              });
            },
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
      // 是否是disabled
      {
        key: 'disabled',
        className: () =>
          `far fa-eye-slash ${
            this.toolConfig.find((t) => t.key === 'disabled').disable() ? 'disable' : ''
          }`,
        title: 'Add node above',
        onClick: () => {
          const disabled = this.toolConfig.find((t) => t.key === 'disabled').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const node = this.findNodeById(cloneData, activeKey);

          Modal.promptCheckbox({
            content: 'disabled',
            checked: node.disabled,
            zIndex: zIndex + 10,
            success: (checked) => {
              return new Promise((resolve) => {
                node.disabled = checked;
                this.setState(
                  {
                    data: cloneData,
                  },
                  () => {
                    resolve();
                  },
                );
              });
            },
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
    ]);
  }

  /**
   * renderTree
   * @return {ReactElement}
   */
  renderTree() {
    const props = {
      ...this.state,
      onActive: ::this.onTreeActive,
      // 编辑完成时
      onEditorModify: ::this.onEditorModify,
      // 节点渲染
      onRenderNode: ::this.onRenderNode,
    };

    return <MenuTree {...props} />;
  }
}

export default VMenuTreeSetting;
