import React from 'react';
import './ComponentToolBaseHOC.less';

const selectorPrefix = 'ct-axure-shape-tool';

export default (Component, { groupKey, componentKey }) => {
  return class extends React.Component {
    render() {
      const { name } = this.props;
      return (
        <div
          className={`${selectorPrefix} ct-droppable-source`}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
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
