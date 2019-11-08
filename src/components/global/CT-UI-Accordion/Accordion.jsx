import React from 'react';
import PropTypes from 'prop-types';
import './Accordion.less';

const selectorPrefix = 'CT-UI-Accordion';

/**
 * Accordion
 * @class Accordion
 * @classdesc Accordion
 */
class Accordion extends React.PureComponent {
  render() {
    const { className = '', children, ...props } = this.props;
    return (
      <div className={`${selectorPrefix} ${className}`} {...props}>
        {children}
      </div>
    );
  }
}

Accordion.defaultProps = {
  className: '',
};

Accordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default Accordion;
