import React from 'react';
import PropTypes from 'prop-types';

import SelectFile from '../CT-UI-SelectFile/SelectFile';

import './BackgroundImgImportPicker.less';

const selectorPrefix = 'CT-UI-BackgroundImgImportPicker';

const defaultImg = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAA8CAYAAADFXvyQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAACDSURBVHhe7dABAQAwDMOg+zfdO1gMgATeOAkKgoKgICgICoKCoCAoCAqCgqAgKAgKgoKgICgICoKCoCAoCAqCgqAgKAgKgoKgICgICoKCoCAoCAqCgqAgKAgKgoKgICgICoKCoCAoCAqCgqAgKAgKgoKgICgICoKCoCAoCAqCgqDT9gGvHEBuBXUCCwAAAABJRU5ErkJggg==';

/**
 * BackgroundImgImportPicker
 * @class BackgroundImgImportPicker
 * @classdesc BackgroundImgImportPicker
 */
class BackgroundImgImportPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backgroundImg: props.backgroundImg,
      disabled: !props.backgroundImg,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      backgroundImg: nextProps.backgroundImg,
      disabled: !nextProps.backgroundImg,
    });
  }

  onSuccess = (data) => {
    const { onChange } = this.props;
    this.setState({
      backgroundImg: data,
    }, () => {
      onChange(data);
    });
  };

  onEmpty = () => {
    const {
      disabled,
    } = this.state;

    const { onChange } = this.props;

    if (disabled) return false;

    this.setState({
      backgroundImg: '',
    }, () => {
      onChange('');
    });
  };

  render() {
    const {
      backgroundImg,
      disabled,
    } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-BackgroundImg`}>
          <img src={backgroundImg || defaultImg} />
        </div>
        <div
          className={`${selectorPrefix}-Import`}
        >
          <SelectFile
            onSuccess={this.onSuccess}
            accept=".gif,.jpg,.jpeg,.png"
            multiple={false}
          >Import
          </SelectFile>
        </div>
        <div
          className={`${selectorPrefix}-Empty ${disabled ? 'disabled' : ''}`}
          onClick={this.onEmpty}
        >empty
        </div>
      </div>
    );
  }
}

BackgroundImgImportPicker.propTypes = {
  backgroundImg: PropTypes.string,
  onChange: PropTypes.func,
};

export default BackgroundImgImportPicker;
