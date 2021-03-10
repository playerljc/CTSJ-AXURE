export default {
  // 样式
  style: {
    /* --- 填充 ---*/
    fill: {
      backgroundColor: '#fff',
    },
    /* ---背景图片---*/
    fillimg: {
      backgroundImg: '',
      repeat: 'no-repeat',
      left: false,
      hcenter: true,
      right: false,
      top: false,
      vcenter: true,
      bottom: false,
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
