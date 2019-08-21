import React from 'react';
import Register from './Register';

import './ComponentToolDragBaseHOC.less';

const selectorPrefix = 'ct-axure-shape-tool-drag';

export default ({ groupKey, componentKey }) => {
  return class extends React.Component {
    render() {
      const Component = Register.get(groupKey).get(componentKey);
      return (
        <div
          className={`${selectorPrefix}`}
        >
          <Component.Component {...this.props} />
        </div>
      );
    }
  };
};
