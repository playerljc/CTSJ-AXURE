import React from 'react';

import { SUMMARYPREFIX } from '../../../util/Constant';

import './SummaryToolBaseHOC.less';

const selectorPrefix = `${SUMMARYPREFIX}-tool`;

export default (Component, { groupKey, componentKey }) => {
  return class extends React.PureComponent {
    render() {
      const {
        name,
        attribute = '{}',
      } = this.props;

      const attrJSON = JSON.parse(attribute);

      return (
        <div
          className={`${selectorPrefix}`}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
        >
          <div className={`${selectorPrefix}-share`}>
            <Component {...this.props} selectorPrefix={selectorPrefix} />
          </div>
          <div className={`${selectorPrefix}-name`}>{name || attrJSON.value}</div>
        </div>
      );
    }
  };
};
