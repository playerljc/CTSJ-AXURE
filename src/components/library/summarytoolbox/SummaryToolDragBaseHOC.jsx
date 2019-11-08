import React from 'react';
import Register from '../Register';
import { DRSPREFIX } from '../../../util/Constant';

import './SummaryToolDragBaseHOC.less';

const selectorPrefix = `${DRSPREFIX}-tool-drag`;

export default ({ groupKey, componentKey }) => {
  return class extends React.PureComponent {
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
