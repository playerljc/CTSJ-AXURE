import React from 'react';
import PropTypes from 'prop-types';
import AlignPicker from '../../../../global/CT-UI-AlignPicker/AlignPicker';

import './Align.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Align';

/**
 * Align
 * @class Align
 * @classdesc 对齐
 */
class Align extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = { ...value };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
  //
  //   return {
  //     ...value,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      ...value,
    });
  }

  render() {
    const { onChange } = this.props;
    return (
      <div className={`${selectorPrefix}`}>
        <AlignPicker
          {...this.state}
          onChange={(align) => {
            if (onChange) {
              onChange(align);
            }
          }}
        />
      </div>
    );
  }
}

Align.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default Align;
