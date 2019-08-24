export default () => ({
  // 样式
  style: {
    // 宽度
    width: 300,
    // 高度
    height: 120,
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
  prop: {},
});
