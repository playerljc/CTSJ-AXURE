export default () => ({
  // 样式
  style: {
    // 宽度
    width: 300,
    // 高度
    height: 30,
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
  prop: {},
});
