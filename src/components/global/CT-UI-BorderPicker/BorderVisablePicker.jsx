import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../CT-UI-Modal/modal';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './BorderVisablePicker.less';

const selectorPrefix = 'CT-UI-BorderPicker-BorderVisablePicker';

/**
 * BorderVisablePickerModal
 * @class BorderVisablePickerModal
 * @classdesc BorderVisablePickerModal
 */
class BorderVisablePickerModal extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    } = this.props;

    this.state = {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    } = nextProps;

    this.state = {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    };
  }

  onLeftClick = () => {
    const { borderLeftDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderLeftDisable: !borderLeftDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onRightClick = () => {
    const { borderRightDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderRightDisable: !borderRightDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onTopClick = () => {
    const { borderTopDisable } = this.state;
    const { onChange } = this.props;


    console.log(borderTopDisable);
    this.setState({
      borderTopDisable: !borderTopDisable,
    }, () => {
      onChange(this.state);
    });
  };

  onBottomClick = () => {
    const { borderBottomDisable } = this.state;
    const { onChange } = this.props;

    this.setState({
      borderBottomDisable: !borderBottomDisable,
    }, () => {
      onChange(this.state);
    });
  };

  render() {
    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    } = this.state;

    const style = {
      borderLeft: !borderLeftDisable ? '2px solid #000' : '0 solid #000',
      borderRight: !borderRightDisable ? '2px solid #000' : '0 solid #000',
      borderTop: !borderTopDisable ? '2px solid #000' : '0 solid #000',
      borderBottom: !borderBottomDisable ? '2px solid #000' : '0 solid #000',
    };

    return (
      <div className={`${selectorPrefix}-Modal`} style={style} >
        <span className={`${selectorPrefix}-Modal-Left ${!borderLeftDisable ? 'active' : ''}`} onClick={this.onLeftClick} />
        <span className={`${selectorPrefix}-Modal-Right ${!borderRightDisable ? 'active' : ''}`} onClick={this.onRightClick} />
        <span className={`${selectorPrefix}-Modal-Top ${!borderTopDisable ? 'active' : ''}`} onClick={this.onTopClick} />
        <span className={`${selectorPrefix}-Modal-Bottom ${!borderBottomDisable ? 'active' : ''}`} onClick={this.onBottomClick} />
      </div>
    );
  }
}

BorderVisablePickerModal.propTypes = {
  borderLeftDisable: PropTypes.bool,
  borderRightDisable: PropTypes.bool,
  borderTopDisable: PropTypes.bool,
  borderBottomDisable: PropTypes.bool,
  onChange: PropTypes.func,
};


/**
 * BorderVisablePicker
 * @class BorderVisablePicker
 * @classdesc BorderVisablePicker
 */
class BorderVisablePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    } = props;

    this.state = {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    };

    this.onArrowClick = this.onArrowClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
    } = nextProps;

    this.setState({
      borderLeftDisable,
      borderRightDisable,
      borderTopDisable,
      borderBottomDisable,
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
      component: (
        <BorderVisablePickerModal
          {...other}
          onChange={(value) => {
            debugger
            this.setState({
              ...value,
            }, () => {
              if (onChange) {
                debugger
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

BorderVisablePicker.propTypes = {
  borderLeftDisable: PropTypes.bool,
  borderRightDisable: PropTypes.bool,
  borderTopDisable: PropTypes.bool,
  borderBottomDisable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default BorderVisablePicker;
