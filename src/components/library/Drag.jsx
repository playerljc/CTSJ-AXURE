import React from 'react';

export default (Component, { groupKey, componentKey }) => {
  return (props) => {
    return (
      <div
        className="ct-drag-item ct-resizeable-item"
        data-groupkey={groupKey}
        data-componentkey={componentKey}
      >
        <Component {...props} />
      </div>
    );
  };
};