/**
 * Actions
 */
export default {
  /**
   * components
   */
  components: {
    business: {
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
      },
    },
    library: {
      component: {
        // Shape处于激活状态
        active: 'components-library-component-active',
      },
    },
  },
};
