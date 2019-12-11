import React from 'react';
import PropTypes from 'prop-types';
import { TableContext } from './Context';

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
     * @param {Object} - props
     */
    constructor(props) {
      super(props);

      this.onCellClick = this.onCellClick.bind(this);

      this.state = {
        editorable: false,
        ...props,
      };
    }

    // static getDerivedStateFromProps(props, state) {
    //   return {
    //     ...props,
    //   };
    // }

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
      const { onEditorModify } = context;

      this.setState({
        editorable: false,
        value,
      }, () => {
        if (onEditorModify) {
          onEditorModify({ value, index, dataIndex });
        }
      });
    }

    /**
     * getOtherProps
     * @return {Object}
     */
    getOtherProps() {
      const { index, dataIndex, editorable, ...otherProps } = this.state;
      return otherProps;
    }

    render() {
      const { editorable = false, value } = this.state;
      return (
        <TableContext.Consumer>{
          (context) => {
            return (
              <div className={`${selectorPrefix}`}>
                {
                  editorable ?
                    <Component
                      {...this.getOtherProps()}
                      context={context}
                      onBlur={(editorValue) => {
                        this.onBlur({ value: editorValue, context });
                      }}
                    /> :
                    (<div onClick={this.onCellClick}>{value}</div>)
                }
              </div>
            );
          }
        }
        </TableContext.Consumer>
      );
    }
  }

  TableEditorHOC.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    index: PropTypes.number,
    dataIndex: PropTypes.string,
  };

  return TableEditorHOC;
};
