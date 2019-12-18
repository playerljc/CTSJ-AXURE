import React from 'react';

import TreeSetting from './TreeSetting';
import Modal from '../CT-UI-Modal/modal';

export default {
  /**
   * open
   * @param {Object} - config
   * @return {*|HTMLDivElement}
   */
  open(config) {
    let TableIns;

    const {
      zIndex = 9999,
      value,
      onSuccess,
    } = config;

    const modal = Modal.open({
      title: 'Tree Setting',
      zIndex,
      minWidth: '250px',
      maxWidth: '80%',
      component: (
        <TreeSetting
          value={value}
          ref={ins => TableIns = ins}
          zIndex={zIndex}
        />
      ),
      xscroll: true,
      yscroll: true,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            const v = TableIns.getValue();
            if (onSuccess) {
              onSuccess(v).then(() => {
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
