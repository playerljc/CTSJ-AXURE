import React from 'react';
import PropTypes from 'prop-types';

import Select from '../CT-UI-Form/select';

const selectorPrefix = 'CT-UI-BackgroundImgRepeatPicker';

const repeatEnum = [
  'no-repeat', // 不重复
  'repeat', // 重复
  'repeatx', // 水平重复
  'repeaty', // 垂直重复
  'fill', // 填充
  'fit', // 适应
];

/**
 * BackgroundImgRepeatPicker
 * @class BackgroundImgRepeatPicker
 * @classdesc BackgroundImgRepeatPicker
 */
class BackgroundImgRepeatPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      repeat: props.repeat,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     repeat: props.repeat,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      repeat: nextProps.repeat,
    });
  }

  onChange = (e) => {
    const { onChange } = this.props;
    const repeat = e.target.value;
    this.setState({
      repeat,
    }, () => {
      onChange(repeat);
    });
  };

  render() {
    const { repeat } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <Select value={repeat} onChange={this.onChange}>
          {repeatEnum.map(t => <option key={t} value={t}>{t}</option>)}
        </Select>
      </div>
    );
  }
}

BackgroundImgRepeatPicker.propTypes = {
  repeat: PropTypes.oneOf(repeatEnum),
};

export default BackgroundImgRepeatPicker;
