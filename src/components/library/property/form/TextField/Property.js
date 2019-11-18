export default () => ({
  style: {
    /* ---位置---*/
    position: {
      left: 0,
      top: 0,
    },
    /* ---尺寸--- */
    dimension: {
      width: 300,
      height: 50,
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
        name: 'TextFieldGroup1',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: 'TextFieldGroup1Text',
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
            value: 'TextFieldGroup1TextField1',
          }],
      },
      {
        id: 'g2',
        name: 'TextFieldGroup2',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: 'TextFieldGroup2Text',
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
            value: 'TextFieldGroup2TextField1',
          }],
      },
    ],
    field: [
      {
        id: 'id1',
        name: 'TextField说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: 'Rect说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: 'TextField说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: 'TextField说明4',
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
    name: 'textField',
  },
});
