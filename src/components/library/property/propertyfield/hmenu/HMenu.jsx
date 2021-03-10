import React from 'react';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from '../../../component/ComponentBaseHOC';
import HMenuSettingPicker from '../../../../../components/global/CT-UI-HMenuSettingPicker/HMenuSettingPicker';

import './HMenu.less';

const selectorPrefix = 'ComponentPropertyPropertyTab-HMenu';

/**
 * HMenu
 * @class HMenu
 * @classdesc 菜单树
 */
class HMenu extends React.PureComponent {
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

  onHMenuSetting() {
    const { onChange } = this.props;
    const { value } = this.state;

    HMenuSettingPicker.open({
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
        <a className={`${selectorPrefix}-Link`} onClick={::this.onHMenuSetting}>
          hmenu setting
        </a>
      </div>
    );
  }
}

HMenu.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default HMenu;
