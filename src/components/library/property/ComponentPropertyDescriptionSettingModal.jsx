import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../global/Tab/Tab';
import TabPanel from '../../global/Tab/TabPanel';
import { Select } from '../../global/CT-UI-Form';
import DescriptionField from './DescriptionField.json';
import './ComponentPropertyDescriptionSettingModal.less';

const selectPrefix = 'ComponentPropertyDescriptionSettingModal';


/**
 * FieldTab
 * @class FieldTab
 * @classdesc FieldTab
 */
class FieldTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldSelectValue: '',
    };
  }

  render() {
    const { fieldSelectValue } = this.state;
    return (
      <div className={`${selectPrefix}-FieldTab`}>
        <fieldset>
          <legend>Custom Field</legend>
          <div>
            <Select value={fieldSelectValue} >
              {DescriptionField.map(({ name, type }) => {
                return (<option value={type}>{name}</option>);
              })}
            </Select>
          </div>
          <div />
        </fieldset>

        <fieldset>
          <legend>editor:list</legend>
        </fieldset>
      </div>
    );
  }
}

FieldTab.defaultProps = {
  data: [],
};

FieldTab.propTypes = {
  data: PropTypes.array,
};


/**
 * SettingTab
 * @class SettingTab
 * @classdesc SettingTab
 */
class SettingTab extends React.Component {
  render() {
    return (
      <div />
    );
  }
}

SettingTab.defaultProps = {
  data: [],
};

SettingTab.propTypes = {
  data: PropTypes.array,
};

/**
 * ComponentPropertyDescriptionSettingModal
 * @class ComponentPropertyDescriptionSettingModal
 * @classdesc ComponentPropertyDescriptionSettingModal
 */
class ComponentPropertyDescriptionSettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'Field',
      property: props.property,
    };
  }

  render() {
    const { activeKey, property: { group = [], field = [] } } = this.state;

    return (
      <div className={`${selectPrefix}`}>
        <Tab
          canRemove={false}
          activeKey={activeKey}
          onChange={(key) => {
            this.setState({
              activeKey: key,
            });
          }}
        >
          <TabPanel key="Field" name="Field">
            <FieldTab data={field} />
          </TabPanel>
          <TabPanel key="Setting" name="Setting">
            <SettingTab data={group} />
          </TabPanel>
        </Tab>
      </div>
    );
  }
}

ComponentPropertyDescriptionSettingModal.propTypes = {
  property: PropsType.object,
};

export default ComponentPropertyDescriptionSettingModal;

