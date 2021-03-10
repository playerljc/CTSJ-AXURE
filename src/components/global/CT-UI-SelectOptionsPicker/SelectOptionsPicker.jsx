import React from 'react';

import SelectOptions from './SelectOptions';
import Modal from '../CT-UI-Modal/modal';

export default {
  /**
   * open
   * @param {Object} - config
   * @return {*|HTMLDivElement}
   */
  open(config) {
    let SelectOptionsIns;

    const {
      zIndex = 9999,
      // 目标 [外部和内部]
      data,
      // 目标值
      value,
      // 页面
      onSuccess,
    } = config;

    const modal = Modal.open({
      title: 'Editor List Option',
      zIndex,
      minWidth: '250px',
      component: (
        <SelectOptions
          data={data}
          value={value}
          ref={(ins) => (SelectOptionsIns = ins)}
          zIndex={zIndex}
        />
      ),
      // yscroll: true,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            const value = SelectOptionsIns.getValue();
            if (onSuccess) {
              onSuccess(value).then(() => {
                Modal.close(modal);
              });
            } else {
              Modal.close(modal);
            }
          },
        },
        {
          text: 'cancel',
          handler: () => {
            Modal.close(modal);
          },
        },
      ],
    });

    return modal;
  },
};
