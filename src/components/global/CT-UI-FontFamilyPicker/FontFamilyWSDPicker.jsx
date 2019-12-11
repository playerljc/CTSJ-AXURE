import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';

import './FontFamilyWSDPicker.less';

const selectorPrefix = 'CT-UI-FontFamilyPicker-FontFamilyWSDPicker';

/**
 * FontFamilyWSDPicker
 * @class FontFamilyWSDPicker
 * @classdesc FontFamilyWSDPicker
 */
class FontFamilyWSDPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      fontWeight,
      fontStyle,
      textDecoration,
    } = props;

    this.state = {
      fontWeight,
      fontStyle,
      textDecoration,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     fontWeight,
  //     fontStyle,
  //     textDecoration,
  //   } = props;
  //
  //   return {
  //     fontWeight,
  //     fontStyle,
  //     textDecoration,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      fontWeight,
      fontStyle,
      textDecoration,
    } = nextProps;

    this.setState({
      fontWeight,
      fontStyle,
      textDecoration,
    });
  }

  onBoldClick = () => {
    const { fontWeight } = this.state;
    this.setState({
      fontWeight: !fontWeight,
    }, () => {
      this.refresh();
    });
  };

  onItalicClick = () => {
    const { fontStyle } = this.state;
    this.setState({
      fontStyle: !fontStyle,
    }, () => {
      this.refresh();
    });
  };

  onUnderlineClick = () => {
    const { textDecoration } = this.state;
    this.setState({
      textDecoration: !textDecoration,
    }, () => {
      this.refresh();
    });
  };

  refresh() {
    const { onChange } = this.props;
    if (onChange) {
      const data = Immutable.cloneDeep(this.state);
      onChange(data);
    }
  }

  render() {
    const {
      fontWeight,
      fontStyle,
      textDecoration,
    } = this.state;

    return (
      <div className={`${selectorPrefix} g-grid-list column3`}>
        <div className={`g-grid-list-item fa fa-bold ${fontWeight ? 'active' : ''}`} onClick={this.onBoldClick} />
        <div className={`g-grid-list-item fa fa-italic ${fontStyle ? 'active' : ''}`} onClick={this.onItalicClick} />
        <div className={`g-grid-list-item fa fa-underline ${textDecoration ? 'active' : ''}`} onClick={this.onUnderlineClick} />
      </div>
    );
  }
}

FontFamilyWSDPicker.propTypes = {
  fontWeight: PropTypes.bool,
  fontStyle: PropTypes.bool,
  textDecoration: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FontFamilyWSDPicker;
