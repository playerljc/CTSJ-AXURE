import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import VMenuTreeSettingPicker from '../../../../../components/global/CT-UI-TreeSettingPicker/VMenuTreeSettingPicker';

import './VMenu.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-VMenu';

/**
 * VMenu
 * @class VMenu
 * @classdesc 菜单树
 */
class VMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;

    this.setState({
      value,
    });
  }

  onVMenuTreeSetting() {
    const { onChange } = this.props;
    const { value } = this.state;

    VMenuTreeSettingPicker.open({
      zIndex: window.parseInt(getMaxLevelNumber()) + 10,
      value,
      onSuccess: (result) => {
        return new Promise((resolve) => {
          this.setState({
            value: result,
          }, () => {
            onChange(result);
            resolve();
          });
        });
      },
    });
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <a
          className={`${selectorPrefix}-Link`}
          onClick={::this.onVMenuTreeSetting}
        >vmenu setting
        </a>
      </div>
    );
  }
}

VMenu.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default VMenu;
