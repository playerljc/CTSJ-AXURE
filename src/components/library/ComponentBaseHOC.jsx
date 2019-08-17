import React from 'react';

export default function (Component) {
  return class extends React.Component {
    componentDidMount() {
      const { getInstance } = this.props;
      if (getInstance) {
        getInstance(this.ins);
      }
    }

    render() {
      return (
        <React.Fragment>
          <Component
            {...this.props}
            ref={(ins) => {
              this.ins = ins;
            }}
          />
        </React.Fragment>
      );
    }
  };
}
