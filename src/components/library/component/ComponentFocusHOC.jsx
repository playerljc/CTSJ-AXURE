import React from 'react';

export default (Component) => {
  return class extends React.Component {
    componentDidMount() {
      this.ins.el.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });

      // this.ins.el.addEventListener('mouseup', () => {
      //   console.log('input end');
      // });
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
};
