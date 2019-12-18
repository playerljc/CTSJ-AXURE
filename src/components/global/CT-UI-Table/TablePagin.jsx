import React from 'react';
import PropTypes from 'prop-types';

import {
  Input, Select,
} from '../CT-UI-Form/index';

import './TablePagin.less';

const selectorPrefix = 'CT-UI-Table-Pagin';

/**
 * SizeChanger
 * @type {number[]}
 */
const SizeChangerOptions = [
  10, 20, 30, 40,
];

/**
 * TablePagin
 * @class TablePagin
 * @classdesc TablePagin
 */
class TablePagin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page,
    });
  }

  /**
   * getPreDisable
   * @return {boolean}
   */
  getPreDisable() {
    const { page } = this.props;
    return page === 1;
  }

  /**
   * getNextDisable
   * @return {boolean}
   */
  getNextDisable() {
    const { page } = this.props;
    const pageCount = this.getPageCount();
    return page === pageCount;
  }

  /**
   * getPageCount
   * @return {number}
   */
  getPageCount() {
    const {
      total = 0,
      pageSize = 10,
    } = this.props;

    // 一共多少页
    return window.parseInt(total / pageSize) + total % pageSize;
  }

  /**
   * onQuickJumperChange
   * @param {Event} - e
   */
  onQuickJumperChange(e) {
    const { page } = this.state;
    let value = window.parseInt(e.target.value.trim());
    const pageCount = this.getPageCount();

    if (Number.isNaN(value)) {
      value = page;
    } else if (value > pageCount && value <= 0) {
      value = page;
    }

    this.setState({
      page: value,
    });
  }

  /**
   * onQuickJumperKeyDown
   */
  onQuickJumperKeyDown() {
    const { page } = this.state;
    const { onQuickJumperKeyDown } = this.props;
    if (onQuickJumperKeyDown) {
      onQuickJumperKeyDown(page);
    }
  }

  // 1 2 3 4 5
  // 2 3 4 5 6
  // 3 4 5 6 7

  render() {
    const {
      total = 0,
      pageSize = 10,
      page = 1,

      onPre,
      onNext,
      onSizeChanger,
    } = this.props;

    // 一共多少页
    const pageCount = this.getPageCount();

    return (
      <div
        className={`${selectorPrefix}`}
      >
        <div className={`${selectorPrefix}-Total`}>Total<span style={{ margin: '0 10px' }}>{total}</span>Items</div>

        <div className={`${selectorPrefix}-Indicat`} >
          <span className={`fa fa-angle-left ${selectorPrefix}-Indicat-Pre ${this.getPreDisable() ? 'disabled' : ''}`} onClick={onPre} />
          <div className={`${selectorPrefix}-Indicat-Inner`}>
            <Input
              type="number"
              value={page}
              onChange={::this.onQuickJumperChange}
              onKeyDown={::this.onQuickJumperKeyDown}
            /> / {pageCount}
          </div>
          <span className={`fa fa-angle-right ${selectorPrefix}-Indicat-Next ${this.getNextDisable() ? 'disabled' : ''}`} onClick={onNext} />
        </div>

        <div className={`${selectorPrefix}-SizeChanger`}>
          <Select
            value={pageSize}
            onChange={onSizeChanger}
          >
            {SizeChangerOptions.map(t => <option key={t} value={t}>{`${t}/page`}</option>)}
          </Select>
        </div>
      </div>
    );
  }
}

TablePagin.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  onPre: PropTypes.func,
  onNext: PropTypes.func,
  onQuickJumperKeyDown: PropTypes.func,
  onSizeChanger: PropTypes.func,
};

export default TablePagin;
