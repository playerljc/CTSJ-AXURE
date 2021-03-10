export default () => ({
  // 样式
  style: {
    /* ---位置---*/
    position: {
      left: 0,
      top: 0,
    },
    /* ---尺寸--- */
    dimension: {
      width: 'auto',
      height: 'auto',
    },
    /* --- 填充 ---*/
    fill: {
      backgroundColor: 'transparent',
    },
    /* --- 阴影 ---*/
    shadow: {
      inset: {
        disabled: true,
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: '#fff',
      },
      outset: {
        disabled: true,
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: '#fff',
      },
    },
    /* --- 边框 ---*/
    border: {
      borderLeftDisable: true,
      borderRightDisable: true,
      borderTopDisable: true,
      borderBottomDisable: true,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: '#fff',
    },
    radius: {
      /* --- 圆角 ---*/
      borderLeftTopRadiusDisable: true,
      borderRightTopRadiusDisable: true,
      borderLeftBottomRadiusDisable: true,
      borderRightBottomRadiusDisable: true,
      radius: 0,
    },
    /* ---透明度---*/
    // opacity
    opacity: 100,
    /* ---字体---*/
    fontfamily: {
      // fontFamily 字体
      fontFamily: '',
      // fontSize 大小
      fontSize: 20,
      // fontWeight 加粗
      fontWeight: true,
      // fontStyle 倾斜
      fontStyle: false,
      // textDecoration 下划线
      textDecoration: false,
      // color 颜色
      color: '',
      // 阴影
      textShadow: {
        // 是否启用
        disabled: true,
        // 水平阴影的位置
        hShadow: 0,
        // 垂直阴影的位置
        vShadow: 0,
        // 模糊的距离
        blur: 0,
        // 颜色
        color: '#fff',
      },
    },
    /* ---行间距---*/
    // lineHeight
    lineheight: '',
    /* ---层级---*/
    zindex: 9999,
    /* ---对其---*/
    align: {
      // 水平左
      hleft: false,
      // 水平右
      hright: false,
      // 水平居中
      hcenter: true,
      // 垂直上
      vtop: false,
      // 垂直居中
      vcenter: true,
      // 垂直下
      vbottom: false,
    },
  },
  // 说明
  description: {
    group: [
      {
        id: 'g1',
        name: 'Rect1Group1',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: 'Rect1Group1Text',
          },
          {
            id: 'i2',
            fieldId: 'id2',
            value: 1999,
          },
          {
            id: 'i3',
            fieldId: 'id3',
            value: '2019-01-01',
          },
          {
            id: 'i4',
            fieldId: 'id4',
            value: 'Rect1Group1Select1',
          },
        ],
      },
      {
        id: 'g2',
        name: 'Rect1Group2',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: 'Rect1Group2Text',
          },
          {
            id: 'i6',
            fieldId: 'id2',
            value: 2000,
          },
          {
            id: 'i7',
            fieldId: 'id3',
            value: '2019-06-06',
          },
          {
            id: 'i8',
            fieldId: 'id4',
            value: 'Rect1Group2Select1',
          },
        ],
      },
    ],
    field: [
      {
        id: 'id1',
        name: 'Rect1说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: 'Rect说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: 'Rect1说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: 'Rect1说明4',
        type: 'select',
        options: ['111', '222', '333'],
      },
    ],
  },
  // 属性
  prop: {
    // 组件的名字
    name: 'H3',
    // 组件的文本
    text: 'Tertiary title',
    // 组件的提示
    tooltip: 'H3',
  },
});
