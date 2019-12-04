import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './ImageTool.less';

/**
 * Image
 * @class ImageTool
 * @classdesc Image
 */
class ImageTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-Image fa fa-tupian`} />
      </React.Fragment>
    );
  }
}

ImageTool.defaultProps = {
  selectorPrefix: '',
};

ImageTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(ImageTool, {
  groupKey: 'base',
  componentKey: 'Image',
});
