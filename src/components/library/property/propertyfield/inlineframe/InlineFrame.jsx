import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../../../util/CTMobile-UI-Util';
import ChooseTargetPicker from '../../../../../components/global/CT-UI-ChooseTarget/ChooseTargetPicker';
import PageModel from '../../../../../model/PageModel';
import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';

import './InlineFrame.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-InlineFrame';

/**
 * InlineFrame
 * @class InlineFrame
 * @classdesc 内部框架
 */
class InlineFrame extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = { ...value };
  }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;

    this.setState({
      ...value,
    });
  }

  refresh() {
    const { onChange } = this.props;
    if (onChange) {
      const data = Immutable.cloneDeep(this.state);
      onChange(data);
    }
  }

  onChooseTarget() {
    const {
      link: {
        target,
        url,
      },
    } = this.state;

    ChooseTargetPicker.open({
      target,
      url,
      page: PageModel.get().getData(),
      zIndex: window.parseInt(getMaxLevelNumber()) + 10,
      onSuccess: (value) => {
        return new Promise((resolve) => {
          this.setState({
            link: {
              ...value,
            },
          }, () => {
            resolve();
            this.refresh();
          });
        });
      },
    });
  }

  onShowBorder() {
    const { showBorder } = this.state;
    this.setState({
      showBorder: !showBorder,
    }, () => {
      this.refresh();
    });
  }

  render() {
    const {
      showBorder,
      link: {
        url,
      },
    } = this.state;

    return (
      <div className={`${selectorPrefix}`} >
        <a
          className={`${selectorPrefix}-ChooseText`}
          onClick={::this.onChooseTarget}
        >Choose a framework goal
        </a>
        <p className={`${selectorPrefix}-ChooseResult`} >{url}</p>
        <input
          type="checkbox"
          checked={showBorder}
          onChange={::this.onShowBorder}
        /><span>Show border</span>
      </div>
    );
  }
}

InlineFrame.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default InlineFrame;
