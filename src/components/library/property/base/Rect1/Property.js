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
        name: '111',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: '111',
          }, {
            id: 'i2',
            fieldId: 'id2',
            value: 222,
          }, {
            id: 'i3',
            fieldId: 'id3',
            value: '2019-01-01',
          }, {
            id: 'i4',
            fieldId: 'id4',
            value: '111',
            options: [
              '111',
              '222',
              '333',
            ],
          }],
      },
      {
        id: 'g2',
        name: '222',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: '222',
          }, {
            id: 'i6',
            fieldId: 'id2',
            value: 333,
          }, {
            id: 'i7',
            fieldId: 'id3',
            value: '2019-06-06',
          }, {
            id: 'i8',
            fieldId: 'id4',
            value: '555',
            options: [
              '444',
              '555',
              '666',
            ],
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
      },
    ],
  },
  // 属性
  prop: {},
});
