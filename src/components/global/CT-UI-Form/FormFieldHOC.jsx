import React from 'react';

const selectorPrefix = 'CT-UI-Form';

export default (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
      };
    }

    onFocus = (e, onFocus) => {
      this.setState({
        active: true,
      }, () => {
        if (onFocus) {
          onFocus(e);
        }
      });
    };

    onBlur = (e, onBlur) => {
      this.setState({
        active: false,
      }, () => {
        if (onBlur) {
          onBlur(e);
        }
      });
    };

    render() {
      const { onFocus, onBlur, ...props } = this.props;
      const { active = false } = this.state;

      return (
        <div className={`${selectorPrefix}-Field ${active ? 'Active' : ''}`}>
          <Component
            {...props}
            onFocus={(e) => {
              this.onFocus(e, onFocus);
            }}
            onBlur={(e) => {
              this.onBlur(e, onBlur);
            }}
          />
        </div>
      );
    }
  };
};
