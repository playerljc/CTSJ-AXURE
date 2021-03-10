import React from 'react';

import ChooseTarget from './ChooseTarget';
import Modal from '../CT-UI-Modal/modal';

export default {
  /**
   * open
   * @param {Object} - config
   * @return {*|HTMLDivElement}
   */
  open(config) {
    let chooseTargetIns;

    const {
      zIndex = 9999,
      // 目标 [外部和内部]
      target, // : PropTypes.oneOf(['inside', 'outer']),
      // 目标值
      url, // : PropTypes.string,
      // 页面
      page, // : PropTypes.array,
      onSuccess, // : PropTypes.func,
    } = config;

    const modal = Modal.open({
      title: 'Choose Target',
      zIndex,
      minWidth: 'auto',
      component: (
        <ChooseTarget
          target={target}
          url={url}
          page={page}
          ref={(ins) => (chooseTargetIns = ins)}
          zIndex={zIndex}
        />
      ),
      // yscroll: true,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            const value = chooseTargetIns.getValue();
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
