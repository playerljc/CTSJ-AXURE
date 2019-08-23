export default {
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
            options: [
              '123',
              '456',
              '789',
            ],
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
            options: [
              '123',
              '456',
              '789',
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
};
