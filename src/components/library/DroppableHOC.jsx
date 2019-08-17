import React from 'react';

export default (Component, { groupKey, componentKey }) => {
  return class extends React.Component {
    render() {
      return (
        <div
          className="ct-droppable-source"
          data-groupkey={groupKey}
          data-componentkey={componentKey}
        >
          <Component {...this.props} />
        </div>
      );
    }
  };
};
