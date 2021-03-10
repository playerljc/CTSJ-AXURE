import React from 'react';
import PropTypes from 'prop-types';

import { TreeContext } from './Context';

import './TreeEditorHOC.less';

const selectorPrefix = 'CT-UI-Tree-TreeEditor';

export default (Component) => {
  /**
   * TreeEditorHOC
   * @class TreeEditorHOC
   * @classdesc TreeEditorHOC
   */
  class TreeEditorHOC extends React.PureComponent {
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
      const { id } = this.state;
      const { onEditorModify } = context;

      this.setState(
        {
          editorable: false,
          value,
        },
        () => {
          if (onEditorModify) {
            onEditorModify({ value, id });
          }
        },
      );
    }

    /**
     * getOtherProps
     * @return {Object}
     */
    getOtherProps() {
      const { editorable, ...otherProps } = this.state;
      return otherProps;
    }

    render() {
      const { editorable = false, value } = this.state;
      return (
        <TreeContext.Consumer>
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
                  <div className={`${selectorPrefix}-Wrap`} onClick={this.onCellClick}>
                    {value}
                  </div>
                )}
              </div>
            );
          }}
        </TreeContext.Consumer>
      );
    }
  }

  TreeEditorHOC.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
  };

  return TreeEditorHOC;
};
