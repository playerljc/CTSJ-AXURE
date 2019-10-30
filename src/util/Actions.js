/**
 * Actions
 */
export default {
  /**
   * components
   */
  components: {
    business: {
      // 页面
      pagepanel: {
        dbclick: 'components-business-pagepanel-dbclick',
      },
      // 画布
      canvaspanel: {
        // 页面的切换
        changetab: 'components-business-canvaspanel-changetab',
        // 页面的增加
        addtab: 'components-business-canvaspanel-addtab',
        // 页面的删除
        removetab: 'components-business-canvaspanel-removetab',
        // 页面处于激活
        activetab: 'components-business-canvaspanel-activetab',
        // 粘贴
        paste: 'components-business-canvaspanel-paste',
        // 全选
        selectall: 'components-business-canvaspanel-selectall',
        // 鼠标滚轮滚动
        mousewheel: 'components-business-canvaspanel-mousewheel',
        // 页面添加一个Shape
        addshape: 'components-business-canvaspanel-addshape',
        // 页面删除一个Shape
        removeshape: 'components-business-canvaspanel-removeshape',
      },
    },
    library: {
      component: {
        // Shape处于激活状态
        active: 'components-library-component-active',
        // Shape的属性变化
        propertychange: 'components-library-component-propertychange',
      },
    },
  },
};
