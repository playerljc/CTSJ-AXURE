import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './RadiusVisablePicker.less';

const selectorPrefix = 'CT-UI-RadiusPicker-RadiusVisablePicker';

/**
 * RadiusVisablePickerModal
 * @class RadiusVisablePickerModal
 * @classdesc RadiusVisablePickerModal
 */
class RadiusVisablePickerModal extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    } = this.props;

    this.state = {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    } = nextProps;

    this.state = {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    };
  }

  onLeftTopClick = () => {
    const { borderLeftTopRadiusDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderLeftTopRadiusDisable: !borderLeftTopRadiusDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onRightTopClick = () => {
    const { borderRightTopRadiusDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderRightTopRadiusDisable: !borderRightTopRadiusDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onLeftBottomClick = () => {
    const { borderLeftBottomRadiusDisable } = this.state;
    const { onChange } = this.props;


    this.setState({
      borderLeftBottomRadiusDisable: !borderLeftBottomRadiusDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onRightBottomClick = () => {
    const { borderRightBottomRadiusDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderRightBottomRadiusDisable: !borderRightBottomRadiusDisable,
    }, () => {
      onChange(this.state);
    });
  };

  render() {
    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    } = this.state;

    const style = {
      borderTopLeftRadius: !borderLeftTopRadiusDisable ? '10px' : '0',
      borderTopRightRadius: !borderRightTopRadiusDisable ? '10px' : '0',
      borderBottomLeftRadius: !borderLeftBottomRadiusDisable ? '10px' : '0',
      borderBottomRightRadius: !borderRightBottomRadiusDisable ? '10px' : '0',
    };

    return (
      <div className={`${selectorPrefix}-Modal`} style={style} >
        <span className={`${selectorPrefix}-Modal-LeftTop ${!borderLeftTopRadiusDisable ? 'active' : ''}`} onClick={this.onLeftTopClick} />
        <span className={`${selectorPrefix}-Modal-RightTop ${!borderRightTopRadiusDisable ? 'active' : ''}`} onClick={this.onRightTopClick} />
        <span className={`${selectorPrefix}-Modal-LeftBottom ${!borderLeftBottomRadiusDisable ? 'active' : ''}`} onClick={this.onLeftBottomClick} />
        <span className={`${selectorPrefix}-Modal-RightBottom ${!borderRightBottomRadiusDisable ? 'active' : ''}`} onClick={this.onRightBottomClick} />
      </div>
    );
  }
}

RadiusVisablePickerModal.propTypes = {
  borderLeftTopRadiusDisable: PropTypes.bool,
  borderRightTopRadiusDisable: PropTypes.bool,
  borderLeftBottomRadiusDisable: PropTypes.bool,
  borderRightBottomRadiusDisable: PropTypes.bool,
  onChange: PropTypes.func,
};


/**
 * RadiusVisablePicker
 * @class RadiusVisablePicker
 * @classdesc RadiusVisablePicker
 */
class RadiusVisablePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    } = props;

    this.state = {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    };

    this.onArrowClick = this.onArrowClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    } = nextProps;

    this.setState({
      borderLeftTopRadiusDisable,
      borderRightTopRadiusDisable,
      borderLeftBottomRadiusDisable,
      borderRightBottomRadiusDisable,
    });
  }

  onArrowClick() {
    const {
      zIndex = window.parseInt(getMaxLevelNumber()) + 10,
      onChange,
      ...other
    } = this.props;

    const modal = Modal.open({
      title: 'borderVisableSetting',
      zIndex,
      minWidth: 'auto',
      contentClass: `${selectorPrefix}-Modal-ViablePicker`,
      component: (
        <RadiusVisablePickerModal
          {...other}
          onChange={(value) => {
            this.setState({
              ...value,
            }, () => {
              if (onChange) {
                onChange(value);
              }
            });
          }}
        />
      ),
      yscroll: false,
      buttons: [{
        text: 'cancel',
        handler: () => {
          Modal.close(modal);
        },
      }],
    });
  }

  render() {
    return (
      <div
        className={`${selectorPrefix}`}
        onClick={this.onArrowClick}
      >
        <div className={`${selectorPrefix}-Inner`} />
        <div className={`fa fa-caret-right ${selectorPrefix}-Arrow`} />
      </div>
    );
  }
}

RadiusVisablePicker.propTypes = {
  borderLeftTopRadiusDisable: PropTypes.bool,
  borderRightTopRadiusDisable: PropTypes.bool,
  borderLeftBottomRadiusDisable: PropTypes.bool,
  borderRightBottomRadiusDisable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadiusVisablePicker;
