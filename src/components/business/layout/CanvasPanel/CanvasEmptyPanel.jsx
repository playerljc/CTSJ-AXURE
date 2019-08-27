import React from 'react';

import './CanvasEmptyPanel.less';

const selectorPrefix = 'CanvasEmptyPanel';

export default () => {
  return (
    <div className={`${selectorPrefix}`} >Double-click to open a page in the Page Management panel</div>
  );
};
