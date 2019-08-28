import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../global/CT-UI-Tab/Tab';
import TabPanel from '../../global/CT-UI-Tab/TabPanel';
import Table from '../../global/CT-UI-Table/Table';
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
        <fieldset className={`${selectPrefix}-FieldTab-FieldSet`}>
          <legend>Custom Field</legend>
          <Select value={fieldSelectValue} >
            {DescriptionField.map(({ name, type }) => {
              return (<option value={type}>{name}</option>);
            })}
          </Select>
          <Table
            columns={[{
              title: 'Field',
              key: 'Field',
              align: 'center',
              dataIndex: 'field',
            }, {
              title: 'Type',
              key: 'Type',
              align: 'center',
              dataIndex: 'type',
            }]}
            data={[{
              field: '111',
              type: '222',
              id: '1',
            }, {
              field: '222',
              type: '222',
              id: '2',
            }, {
              field: '33',
              type: '222',
              id: '3',
            }]}
            rowKey="id"
          />
        </fieldset>

        <fieldset className={`${selectPrefix}-FieldTab-FieldSet`}>
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
  property: PropTypes.object,
};

export default ComponentPropertyDescriptionSettingModal;

