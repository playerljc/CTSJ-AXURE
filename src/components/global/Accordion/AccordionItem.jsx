import React from 'react';
import PropTypes from 'prop-types';
import './AccordionItem.less';

const selectorPrefix = 'AX-AccordionItem';

/**
 * AccordionItem
 * @class AccordionItem
 * @classdesc AccordionItem
 */
class AccordionItem extends React.Component {
  render() {
    const {
      className = '',
      name = '',
      extend,
      children,
      triggerClassName = '',
      ...props
    } = this.props;
    return (
      <details className={`${selectorPrefix} ${className}`} {...props}>
        <summary className={`${selectorPrefix}-Trigger ${triggerClassName}`}>
          <span className={`${selectorPrefix}-Trigger-Name`}>{name}</span>
          <div className={`${selectorPrefix}-Trigger-Extend`}>{extend}</div>
        </summary>
        <div className={`${selectorPrefix}-Content`}>{children}</div>
      </details>
    );
  }
}

AccordionItem.defaultProps = {
  className: '',
  name: '',
  triggerClassName: '',
  open: false,
};

AccordionItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  extend: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  triggerClassName: PropTypes.string,
  open: PropTypes.bool,
};

export default AccordionItem;
