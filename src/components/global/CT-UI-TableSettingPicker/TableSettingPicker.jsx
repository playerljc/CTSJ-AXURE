import React from 'react';

import TableSetting from './TableSetting';
import Modal from '../CT-UI-Modal/modal';

export default {
  /**
   * open
   * @param {Object} - config
   * @return {*|HTMLDivElement}
   */
  open(config) {
    let TableIns;

    const { zIndex = 9999, value, onSuccess } = config;

    const modal = Modal.open({
      title: 'Table Setting',
      zIndex,
      minWidth: '250px',
      maxWidth: '80%',
      component: <TableSetting value={value} ref={(ins) => (TableIns = ins)} zIndex={zIndex} />,
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
