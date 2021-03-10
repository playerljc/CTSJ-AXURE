import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import TreeSettingPicker from '../../../../../components/global/CT-UI-TreeSettingPicker/TreeSettingPicker';

import './Tree.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-Tree';

/**
 * Tree
 * @class Tree
 * @classdesc 树
 */
class Tree extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      value,
    });
  }

  onTreeSetting() {
    const { onChange } = this.props;
    const { value } = this.state;

    TreeSettingPicker.open({
      zIndex: window.parseInt(getMaxLevelNumber()) + 10,
      value,
      onSuccess: (result) => {
        return new Promise((resolve) => {
          this.setState(
            {
              value: result,
            },
            () => {
              onChange(result);
              resolve();
            },
          );
        });
      },
    });
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <a className={`${selectorPrefix}-Link`} onClick={::this.onTreeSetting}>
          tree setting
        </a>
      </div>
    );
  }
}

Tree.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default Tree;
