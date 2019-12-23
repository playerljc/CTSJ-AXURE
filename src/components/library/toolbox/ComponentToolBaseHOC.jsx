import React from 'react';

import { DRSPREFIX } from '../../../util/Constant';

import './ComponentToolBaseHOC.less';

const selectorPrefix = `${DRSPREFIX}-tool`;

export default (Component, { groupKey, componentKey }) => {
  return class extends React.PureComponent {
    render() {
      const { name, attribute } = this.props;

      const props = {
        className: `${selectorPrefix} ct-droppable-source`,
        'data-groupkey': groupKey,
        'data-componentkey': componentKey,
      };

      if (attribute) {
        props['data-attribute'] = JSON.stringify(attribute);
      }

      return (
        <div
          {...props}
        >
          <div className={`${selectorPrefix}-pattern`}>
            <div className={`${selectorPrefix}-pattern-inner`}>
              <Component {...this.props} selectorPrefix={selectorPrefix} />
            </div>
          </div>
          <div className={`${selectorPrefix}-name`}>{name}</div>
        </div>
      );
    }
  };
};
