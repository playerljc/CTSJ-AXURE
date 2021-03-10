import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import SelectionOptionsPicker from '../../../../global/CT-UI-SelectOptionsPicker/SelectOptionsPicker';

import './SelectOptions.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-SelectOptions';

/**
 * SelectOptions
 * @class SelectOptions
 * @classdesc Select的Options设置
 */
class SelectOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = { ...value };
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
    const { value } = nextProps;

    this.setState({
      ...value,
    });
  }

  onListItemClick() {
    const { data, value } = this.state;

    const { onChange } = this.props;

    SelectionOptionsPicker.open({
      zIndex: window.parseInt(getMaxLevelNumber()) + 10,
      data,
      value,
      onSuccess: (result) => {
        return new Promise((resolve) => {
          this.setState(result, () => {
            onChange(result);
            resolve();
          });
        });
      },
    });
  }

  renderLabel() {
    const { value = '', data = [] } = this.state;

    const item = data.find(({ value: v }) => v === value);
    return item ? item.label : '';
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <a className={`${selectorPrefix}-Link`} onClick={::this.onListItemClick}>
          List Item
        </a>
        <p>{this.renderLabel()}</p>
      </div>
    );
  }
}

SelectOptions.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default SelectOptions;
