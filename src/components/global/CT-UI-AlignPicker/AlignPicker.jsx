import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';

import './AlignPicker.less';

const selectorPrefix = 'CT-UI-AlignPicker';

/**
 * AlignPicker
 * @class AlignPicker
 * @classdesc AlignPicker
 */
class AlignPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      hleft,
      hright,
      hcenter,
      vtop,
      vcenter,
      vbottom,
    } = props;

    this.state = {
      hleft,
      hright,
      hcenter,
      vtop,
      vcenter,
      vbottom,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     hleft,
  //     hright,
  //     hcenter,
  //     vtop,
  //     vcenter,
  //     vbottom,
  //   } = props;
  //
  //   return {
  //     hleft,
  //     hright,
  //     hcenter,
  //     vtop,
  //     vcenter,
  //     vbottom,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      hleft,
      hright,
      hcenter,
      vtop,
      vcenter,
      vbottom,
    } = nextProps;

    this.setState({
      hleft,
      hright,
      hcenter,
      vtop,
      vcenter,
      vbottom,
    });
  }

  onHLeftClick = () => {
    const { hleft } = this.state;
    this.setState({
      hleft: !hleft,
      hright: hleft,
      hcenter: hleft,
    }, () => {
      this.refresh();
    });
  };

  onHCenterClick = () => {
    const { hcenter } = this.state;
    this.setState({
      hleft: hcenter,
      hcenter: !hcenter,
      hright: hcenter,
    }, () => {
      this.refresh();
    });
  };

  onHRightClick = () => {
    const { hright } = this.state;
    this.setState({
      hleft: hright,
      hright: !hright,
      hcenter: hright,
    }, () => {
      this.refresh();
    });
  };


  onVTopClick = () => {
    const { vtop } = this.state;
    this.setState({
      vtop: !vtop,
      vcenter: vtop,
      vbottom: vtop,
    }, () => {
      this.refresh();
    });
  };

  onVCenterClick = () => {
    const { vcenter } = this.state;
    this.setState({
      vtop: vcenter,
      vcenter: !vcenter,
      vbottom: vcenter,
    }, () => {
      this.refresh();
    });
  };

  onVBottomClick = () => {
    const { vbottom } = this.state;
    this.setState({
      vtop: vbottom,
      vbottom: !vbottom,
      vcenter: vbottom,
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
      hleft,
      hright,
      hcenter,
      vtop,
      vcenter,
      vbottom,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix} g-grid-list column3`}>
          <div className={`g-grid-list-item fa fa-align-left hleft ${hleft ? 'active' : ''}`} onClick={this.onHLeftClick} />
          <div className={`g-grid-list-item fa fa-align-center hcenter ${hcenter ? 'active' : ''}`} onClick={this.onHCenterClick} />
          <div className={`g-grid-list-item fa fa-align-right hright ${hright ? 'active' : ''}`} onClick={this.onHRightClick} />
        </div>
        <div className={`${selectorPrefix} g-grid-list column3`}>
          <div className={`g-grid-list-item fa fa-dedent vtop ${vtop ? 'active' : ''}`} onClick={this.onVTopClick} />
          <div className={`g-grid-list-item fa fa-align-justify vcenter ${vcenter ? 'active' : ''}`} onClick={this.onVCenterClick} />
          <div className={`g-grid-list-item fa fa-indent vbottom ${vbottom ? 'active' : ''}`} onClick={this.onVBottomClick} />
        </div>
      </div>
    );
  }
}

AlignPicker.propTypes = {
  // 水平左
  hleft: PropTypes.bool,
  // 水平右
  hright: PropTypes.bool,
  // 水平居中
  hcenter: PropTypes.bool,
  // 垂直上
  vtop: PropTypes.bool,
  // 垂直居中
  vcenter: PropTypes.bool,
  // 垂直下
  vbottom: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AlignPicker;
