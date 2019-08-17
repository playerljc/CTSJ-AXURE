import React from 'react';

export default (Component, { groupKey, componentKey }) => {
  return class extends React.Component {
    render() {
      const { number = 1 } = this.props;
      return (
        <div
          className="ct-drag-item ct-resizeable-item"
          style={{ zIndex: number, border: '1px solid' }}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
        >
          <Component {...this.props} />
        </div>
      );
    }
  };
};
