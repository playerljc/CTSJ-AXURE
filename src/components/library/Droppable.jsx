import React from 'react';

export default (Component, { groupKey, componentKey }) => {
  return (props) => {
    return (
      <div
        className="ct-droppable-source"
        data-groupkey={groupKey}
        data-componentkey={componentKey}
      >
        <Component {...props} />
      </div>
    );
  };
};
