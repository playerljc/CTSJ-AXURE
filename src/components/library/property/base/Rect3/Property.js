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
      // boxShadow
      boxShadow: '',
    },
    /* --- 边框 ---*/
    border: {
      borderLeftWidth: '',
      borderLeftStyle: '',
      borderLeftColor: '',

      borderRightWidth: '',
      borderRightStyle: '',
      borderRightColor: '',

      borderTopWidth: '',
      borderTopStyle: '',
      borderTopColor: '',

      borderBottomWidth: '',
      borderBottomStyle: '',
      borderBottomColor: '',
    },
    radius: {
      /* --- 圆角 ---*/
      // borderRadius
      borderRadius: '',
    },
    /* ---透明度---*/
    // opacity
    opacity: 1,
    /* ---字体---*/
    fontfamily: {
      // fontFamily
      fontFamily: '',
      // fontSize
      fontSize: 0,
      // fontWeight
      fontWeight: '',
      // fontStyle
      fontStyle: '',
      // textDecoration
      textDecoration: '',
      // color
      color: '',
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
        name: 'Rect3Group1',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: 'Rect3Group1Text',
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
            value: 'Rect3Group1Select1',
          }],
      },
      {
        id: 'g2',
        name: 'Rect3Group2',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: 'Rect3Group2Text',
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
            value: 'Rect3Group2Select1',
          }],
      },
    ],
    field: [
      {
        id: 'id1',
        name: 'Rect3说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: 'Rect说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: 'Rect3说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: 'Rect3说明4',
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
    name: 'react3',
  },
});
