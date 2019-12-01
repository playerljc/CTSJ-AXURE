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
        dbclick: Symbol(),
        stylechange: Symbol(),
      },
      // 画布
      canvaspanel: {
        // 页面的切换
        changetab: Symbol(),
        // 页面的增加
        addtab: Symbol(),
        // 页面的删除
        removetab: Symbol(),
        // 页面处于激活
        activetab: Symbol(),
        // 粘贴
        paste: Symbol(),
        // 全选
        selectall: Symbol(),
        // 鼠标滚轮滚动
        mousewheel: Symbol(),
        // 页面添加一个Shape
        addshape: Symbol(),
        // 页面删除一个Shape
        removeshape: Symbol(),
      },
    },
    library: {
      component: {
        // Shape处于激活状态
        active: Symbol(),
        // Shape处于未激活状态
        unactive: Symbol(),
        // Shape处于Range激活状态
        rangeselectactive: Symbol(),
        // Shape处于Range未激活状态
        unrangeselectactive: Symbol(),
        // Shape的属性变化
        propertychange: Symbol(),
        // Shape的style变化
        stylechange: Symbol(),
      },
    },
  },
};
