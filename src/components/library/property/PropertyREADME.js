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
        name: '111',
        fields: [
          {
            fieldId: 'id1',
            value: '222',
          }, {
            fieldId: 'id2',
            value: 123,
          }, {
            fieldId: 'id3',
            value: 2010012312301230,
          }, {
            fieldId: 'id4',
            value: '123',
          }],
      },
      {
        id: 'g2',
        name: '222',
        fields: [
          {
            fieldId: 'id1',
            value: '222',
          }, {
            fieldId: 'id2',
            value: 123,
          }, {
            fieldId: 'id3',
            value: 2010012312301230,
          }, {
            fieldId: 'id4',
            value: '456',
          }],
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
    name: '',
  },
};
