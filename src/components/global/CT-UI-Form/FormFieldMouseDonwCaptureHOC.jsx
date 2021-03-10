import React from 'react';

export default (Component) => {
  return class extends React.PureComponent {
    render() {
      return (
        <Component
          {...this.props}
          onKeyDownCapture={(e) => {
            e.stopPropagation();
          }}
        />
      );
    }
  };
};
