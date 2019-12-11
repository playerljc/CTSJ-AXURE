import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../../global/CT-UI-Form/select';

import './LineHeight.less';

const selectorPrefix = 'ComponentPropertyStyleTab-LineHeight';

const lineHeightEnum = [
  '--',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '16',
  '18',
  '20',
  '28',
  '36',
  '48',
  '72',
];

/**
 * LineHeight
 * @class LineHeight
 * @classdesc 行间距
 */
class LineHeight extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      value: value === 'normal' ? '--' : value.replace('px', ''),
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
  //
  //   return {
  //     value: value === 'normal' ? '--' : value.replace('px', ''),
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;

    this.setState({
      value: value === 'normal' ? '--' : value.replace('px', ''),
    });
  }

  render() {
    const { value } = this.state;
    const { onChange } = this.props;

    return (
      <div className={`${selectorPrefix}`}>
        <Select
          value={value}
          onChange={(e) => {
            let lineheight = e.target.value;
            lineheight = lineheight === '--' ? 'normal' : `${lineheight}px`;
            if (onChange) {
              onChange(lineheight);
            }
          }}
        >
          {lineHeightEnum.map((t) => {
            return (<option key={t} value={t}>{t}</option>);
          })}
        </Select>
      </div>
    );
  }
}

LineHeight.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default LineHeight;
