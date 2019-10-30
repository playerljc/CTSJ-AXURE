export default () => ({
  // 样式
  style: {
    // 宽度
    width: 300,
    // 高度
    height: 50,
  },
  // 说明
  description: {
    group: [
      {
        id: 'g1',
        name: 'SelectGroup1',
        fields: [
          {
            id: 'i1',
            fieldId: 'id1',
            value: 'SelectGroup1Text',
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
            value: 'SelectGroup1Select1',
          }],
      },
      {
        id: 'g2',
        name: 'SelectGroup2',
        fields: [
          {
            id: 'i5',
            fieldId: 'id1',
            value: 'SelectGroup2Text',
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
            value: 'SelectGroup2Select1',
          }],
      },
    ],
    field: [
      {
        id: 'id1',
        name: 'Select说明1',
        type: 'text',
      },
      {
        id: 'id2',
        name: 'Rect说明2',
        type: 'number',
      },
      {
        id: 'id3',
        name: 'Select说明3',
        type: 'date',
      },
      {
        id: 'id4',
        name: 'Select说明4',
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
    name: 'select',
  },
});
