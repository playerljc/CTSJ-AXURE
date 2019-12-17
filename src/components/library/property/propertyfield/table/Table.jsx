import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import TableSettingPicker from '../../../../../components/global/CT-UI-TableSettingPicker/TableSettingPicker';

import './Table.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Table';

/**
 * Table
 * @class Table
 * @classdesc 表格
 */
class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      value,
    };
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

  onTableSetting() {
    const { onChange } = this.props;
    const { value } = this.state;

    TableSettingPicker.open({
      zIndex: window.parseInt(getMaxLevelNumber()) + 10,
      value,
      onSuccess: (result) => {
        return new Promise((resolve) => {
          this.setState({
            value: result,
          }, () => {
            onChange(result);
            resolve();
          });
        });
      },
    });
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <a
          className={`${selectorPrefix}-Link`}
          onClick={::this.onTableSetting}
        >table setting
        </a>
      </div>
    );
  }
}

Table.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default Table;
