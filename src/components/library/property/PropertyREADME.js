export default {
  // 样式
  style: {
    /* ---位置---*/
    position: {
      left: 0,
      top: 0,
    },
    /* ---尺寸--- */
    dimension: {
      width: 300,
      height: 120,
    },
    /* --- 填充 ---*/
    fill: {
      backgroundColor: '#fff',
    },
    /* --- 阴影 ---*/
    shadow: {
      inset: {
        disabled: false,
        offsetX: '',
        offsetY: '',
        blurRadius: '',
        spreadRadius: '',
        color: '',
      },
      outset: {
        disabled: false,
        offsetX: '',
        offsetY: '',
        blurRadius: '',
        spreadRadius: '',
        color: '',
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
      fontSize: 0,
      // fontWeight 加粗
      fontWeight: false,
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
        name: '111',
        fields: [
          {
            fieldId: 'id1',
            value: '222',
          },
          {
            fieldId: 'id2',
            value: 123,
          },
          {
            fieldId: 'id3',
            value: 2010012312301230,
          },
          {
            fieldId: 'id4',
            value: '123',
          },
        ],
      },
      {
        id: 'g2',
        name: '222',
        fields: [
          {
            fieldId: 'id1',
            value: '222',
          },
          {
            fieldId: 'id2',
            value: 123,
          },
          {
            fieldId: 'id3',
            value: 2010012312301230,
          },
          {
            fieldId: 'id4',
            value: '456',
          },
        ],
      },
    ],
    field: [
      {
        id: 'id1',
        name: '说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: '说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: '说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: '说明4',
        type: 'select',
        options: ['111', '222', '333'],
      },
    ],
  },
  // 属性
  prop: {
    // 组件的名字
    name: '',
  },
};
