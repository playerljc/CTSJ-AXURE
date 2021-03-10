import React from 'react';
import PropTypes from 'prop-types';

import { Dom6 } from '../../../util/CTMobile-UI-Util';

const selectorPrefix = 'CT-UI-SelectFile';

/**
 * SelectFile
 * @class SelectFile
 * @classdesc SelectFile
 */
class SelectFile extends React.PureComponent {
  onClick = () => {
    if (this.inputEl) {
      this.inputEl.parentElement.removeChild(this.inputEl);
    }
    const { accept = '*', multiple = false, onSuccess } = this.props;
    this.inputEl = Dom6.createElement(`
      <input 
        type="file"
        style="display: none;"
        accept="${accept}"
        ${multiple ? 'multiple' : ''}
       />
    `);

    this.inputEl.addEventListener('change', () => {
      const { files } = this.inputEl;

      if (files.length <= 0) return false;

      if (files.length > 1) {
        if (onSuccess) {
          onSuccess(files);
        }
      } else {
        const file = files[0];
        const fr = new FileReader();
        fr.onload = (e) => {
          if (onSuccess) {
            onSuccess(e.target.result);
          }
        };
        fr.readAsDataURL(file);
      }
    });

    this.el.appendChild(this.inputEl);

    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, true);
    this.inputEl.dispatchEvent(e);
  };

  render() {
    return (
      <div className={`${selectorPrefix}`} onClick={this.onClick} ref={(el) => (this.el = el)}>
        {this.props.children}
      </div>
    );
  }
}

SelectFile.propTypes = {
  onSuccess: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
};

export default SelectFile;
