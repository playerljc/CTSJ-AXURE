import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../../global/CT-UI-Form/select';

import './InputTypeSelect.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-InputTypeSelect';

/**
 * InputTypeSelect
 * @class InputTypeSelect
 * @classdesc input的type类型选择
 */
class InputTypeSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = { value };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
  //
  //   return {
  //     value,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;

    this.setState({
      value,
    });
  }

  render() {
    const { onChange } = this.props;
    const { value } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <Select
          type="number"
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim();
            this.setState({
              value: v,
            }, () => {
              onChange(v);
            });
          }}
        >
          <option key="text" value="text">text</option>
          <option key="button" value="button">button</option>
          <option key="checkbox" value="checkbox">checkbox</option>
          <option key="color" value="color">color</option>
          <option key="date" value="date">date</option>
          <option key="datetime" value="datetime">datetime</option>
          <option key="email" value="email">email</option>
          <option key="file" value="file">file</option>
          <option key="image" value="image">image</option>
          <option key="month" value="month">month</option>
          <option key="number" value="number">number</option>
          <option key="password" value="password">password</option>
          <option key="radio" value="radio">radio</option>
          <option key="range" value="range">range</option>
          <option key="reset" value="reset">reset</option>
          <option key="search" value="search">search</option>
          <option key="submit" value="submit">submit</option>
          <option key="tel" value="tel">tel</option>
          <option key="url" value="url">url</option>
        </Select>
      </div>
    );
  }
}

InputTypeSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputTypeSelect;
