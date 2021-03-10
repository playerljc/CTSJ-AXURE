import React from 'react';
import PropTypes from 'prop-types';

import Tab from '../../../global/CT-UI-Tab/Tab';
import TabPanel from '../../../global/CT-UI-Tab/TabPanel';

import { Immutable } from '../../../../util/CTMobile-UI-Util';

import FieldTab from './FieldTab';
import SettingTab from './SettingTab';

import './ComponentPropertyDescriptionSettingModal.less';

const selectPrefix = 'ComponentPropertyDescriptionSettingModal';
export { selectPrefix };

/**
 * ComponentPropertyDescriptionSettingModal
 * @class ComponentPropertyDescriptionSettingModal
 * @classdesc ComponentPropertyDescriptionSettingModal
 */
class ComponentPropertyDescriptionSettingModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onAddField = this.onAddField.bind(this);
    this.onDeleteField = this.onDeleteField.bind(this);

    this.state = {
      activeKey: 'Field',
      property: props.property,
    };
  }

  onAddField(field) {
    // 在这里进行group引用filed的删减操作
    const property = Immutable.cloneDeep(this.state.property);
    property.field = field;
    this.setState({
      property,
    });
  }

  onDeleteField({ field, fieldId: deleteFieldId }) {
    // 在这里进行group引用filed的删减操作
    const { group = [] } = Immutable.cloneDeep(this.state.property);
    let isUpdate = false;
    group.forEach(({ fields }) => {
      fields.forEach(({ fieldId }, index) => {
        if (deleteFieldId === fieldId) {
          fields.splice(index, 1);
          isUpdate = true;
        }
      });
    });

    if (isUpdate) {
      this.setState({
        property: {
          group,
          field,
        },
      });
    } else {
      this.setState({
        property: {
          field,
        },
      });
    }
  }

  getData() {
    return {
      field: this.fieldTabIns.getData(),
      group: this.settingTabIns.getData(),
    };
  }

  render() {
    const {
      activeKey,
      property: { group = [], field = [] },
    } = this.state;

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
            <FieldTab
              data={field}
              onAddField={this.onAddField}
              onDeleteField={this.onDeleteField}
              ref={(ins) => {
                this.fieldTabIns = ins;
              }}
            />
          </TabPanel>
          <TabPanel key="Setting" name="Setting">
            <SettingTab
              data={{
                group,
                field,
              }}
              ref={(ins) => {
                this.settingTabIns = ins;
              }}
            />
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
