import React from 'react';
import './form.less';

const selectorPrefix = 'CT-UI-Form';

/**
 * Form
 * @class Form
 * @classdesc Form
 */
class Form extends React.PureComponent {
  render() {
    const { children } = this.props;
    return <div className={`${selectorPrefix}`}>{children}</div>;
  }
}

/**
 * FormFieldManager
 * @class FormFieldManager
 * @classdesc FormFieldManager
 */
class FormFieldManager {
  constructor() {
    this.fieldIns = new Map();
  }

  /**
   * createField
   * @return {ReactElement}
   * @param FieldComponent
   * @param name
   */
  createField(FieldComponent, name) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return class extends React.PureComponent {
      constructor(props) {
        super(props);
        const { value = '' } = props;
        this.state = { value };
      }

      componentDidMount() {
        self.fieldIns.set(name, this);
      }

      /**
       * onChange
       * @param e
       * @param onChange
       */
      onChange(e, onChange) {
        this.setState({
          value: e.target ? e.target.value : e,
        });

        if (onChange) {
          onChange(e);
        }
      }

      /**
       * getValue
       * @return {String}
       */
      getValue() {
        return this.state.value;
      }

      render() {
        const { onChange, ...formFieldManagerProps } = this.props;
        return (
          <FieldComponent
            {...formFieldManagerProps}
            // defalutValue={formFieldManagerProps.value}
            value={this.state.value /* || formFieldManagerProps.value */}
            onChange={(e) => {
              this.onChange(e, onChange);
            }}
          />
        );
      }
    };
  }

  /**
   * getFieldValue
   * @param {String} - name
   * @return {String}
   */
  getFieldValue(name) {
    const fieldIns = this.fieldIns.get(name);
    let value;
    if (fieldIns) {
      value = fieldIns.getValue();
    }
    return value;
  }

  /**
   * getFieldValues
   * @return {Array<String>}
   */
  getFieldValues() {
    const keys = this.getFieldNames();
    return keys.map((key) => {
      return this.getFieldValue(key);
    });
  }

  /**
   * getFieldEntrys
   * @return {Array<{name,value}>}
   */
  getFieldEntrys() {
    const keys = this.getFieldNames();
    return keys.map((key) => {
      return {
        name: key,
        value: this.getFieldValue(key),
      };
    });
  }

  /**
   * getFieldNames
   * @return {Array<String>}
   */
  getFieldNames() {
    return [...this.fieldIns.keys()];
  }

  /**
   * clear
   */
  clear() {
    this.fieldIns.clear();
  }
}

/**
 * create
 * @return {ReactElement}
 * @param Component
 */
function create(Component) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.formFieldManager = new FormFieldManager();
    }

    render() {
      return (
        <>
          <Component {...this.props} form={this.formFieldManager} />
        </>
      );
    }
  };
}

export { create };

export default Form;
