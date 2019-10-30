import React from 'react';

import { SUMMARYPREFIX } from '../../../util/Constant';

import './SummaryToolBaseHOC.less';

const selectorPrefix = `${SUMMARYPREFIX}-tool`;

export default (Component, { groupKey, componentKey }) => {
  return class extends React.Component {
    render() {
      const { name } = this.props;
      return (
        <div
          className={`${selectorPrefix}`}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
        >
          <div className={`${selectorPrefix}-share`}>
            <Component {...this.props} selectorPrefix={selectorPrefix} />
          </div>
          <div className={`${selectorPrefix}-name`}>{name}</div>
        </div>
      );
    }
  };
};
