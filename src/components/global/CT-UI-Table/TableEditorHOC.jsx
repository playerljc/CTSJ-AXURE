import React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Context';
import { Immutable } from '../../../util/CTMobile-UI-Util';

import './TableEditorHOC.less';

const selectorPrefix = 'CT-UI-Table-TableEditor';

export default (Component) => {
  /**
   * TableEditorHOC
   * @class TableEditorHOC
   * @classdesc TableEditorHOC
   */
  class TableEditorHOC extends React.PureComponent {
    /**
     * constructor
     * @param props
     */
    constructor(props) {
      super(props);

      this.onCellClick = this.onCellClick.bind(this);

      this.state = {
        editorable: false,
        ...props,
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        ...nextProps,
      });
    }

    /**
     * onCellClick
     */
    onCellClick() {
      this.setState({
        editorable: true,
      });
    }

    /**
     * onBlur
     * @param {String} - value
     * @param {Object} - context
     */
    onBlur({ value, context }) {
      const { index, dataIndex } = this.state;
      const { onEditorModify } = context.props;

      this.setState(
        {
          editorable: false,
          value,
        },
        () => {
          if (onEditorModify) {
            onEditorModify({ value, index, dataIndex });
          }
        },
      );
    }

    /**
     * getOtherProps
     * @return {Object}
     */
    getOtherProps() {
      const { index, dataIndex, editorable, ...otherProps } = this.state;
      return Immutable.cloneDeep(otherProps);
    }

    render() {
      const { editorable = false, value } = this.state;
      return (
        <TableContext.Consumer>
          {(context) => {
            return (
              <div className={`${selectorPrefix}`}>
                {editorable ? (
                  <Component
                    {...this.getOtherProps()}
                    context={context}
                    onBlur={(editorValue) => {
                      this.onBlur({ value: editorValue, context });
                    }}
                  />
                ) : (
                  <div
                    className={`${selectorPrefix}-Wrap`}
                    onClickCapture={() => {
                      this.onCellClick();
                    }}
                  >
                    {value}
                  </div>
                )}
              </div>
            );
          }}
        </TableContext.Consumer>
      );
    }
  }

  TableEditorHOC.propTypes = {
    value: PropTypes.string,
    index: PropTypes.number,
    dataIndex: PropTypes.string,
  };

  return TableEditorHOC;
};
