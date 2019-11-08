import React from 'react';

/**
 * 获取组件最大的层级数
 * @return {string}
 */
function getMaxLevelNumber() {
  return '99999';
}

export { getMaxLevelNumber };

export default function (Component) {
  return class extends React.PureComponent {
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
