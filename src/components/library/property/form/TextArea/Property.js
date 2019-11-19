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
    lineHeight: '',
    /* ---层级---*/
    zIndex: 9999,
  },
  // 说明
  description: {
    group: [
      {
        id: 'g1',
        name: 'TextAreaGroup1',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: 'TextAreaGroup1Text',
          }, {
            id: 'i2',
            fieldId: 'id2',
            value: 1999,
          }, {
            id: 'i3',
            fieldId: 'id3',
            value: '2019-01-01',
          }, {
            id: 'i4',
            fieldId: 'id4',
            value: 'TextAreaGroup1TextArea1',
          }],
      },
      {
        id: 'g2',
        name: 'TextAreaGroup2',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: 'TextAreaGroup2Text',
          }, {
            id: 'i6',
            fieldId: 'id2',
            value: 2000,
          }, {
            id: 'i7',
            fieldId: 'id3',
            value: '2019-06-06',
          }, {
            id: 'i8',
            fieldId: 'id4',
            value: 'TextAreaGroup2TextArea1',
          }],
      },
    ],
    field: [
      {
        id: 'id1',
        name: 'TextArea说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: 'Rect说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: 'TextArea说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: 'TextArea说明4',
        type: 'select',
        options: [
          '111',
          '222',
          '333',
        ],
      },
    ],
  },
  // 属性
  prop: {
    // 组件的名字
    name: 'textArea',
  },
});
