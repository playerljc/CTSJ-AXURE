import React from 'react';

import Tab from '../../../global/CT-UI-Tab/Tab';
import TabPanel from '../../../global/CT-UI-Tab/TabPanel';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import OpenPageModel from '../../../../model/OpenPageModel';

import CanvasTabPanel from './CanvasTabPanel';
import CanvasEmptyPanel from './CanvasEmptyPanel';
import CanvasTabPanelPropertyDefaultConfig from './property/Property';
import { CanvasPanelContext } from './CanvasPanelContext';

import './CanvasPanel.less';

const { Component } = React;

const selectorPrefix = 'CanvasPanel';

const onRemoveSymbol = Symbol('onRemove');

/**
 * CanvasPabel
 * @class CanvasPanel
 * @classdesc CanvasPanel
 */
class CanvasPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        /* {
        name,
        id,
        property
      } */
      ],
      activeKey: '',
    };

    this.onDBClick = this.onDBClick.bind(this);
  }

  componentDidMount() {
    Emitter.on(Actions.components.business.pagepanel.dbclick, this.onDBClick);
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.pagepanel.dbclick, this.onDBClick);
  }

  /**
   * onDBClick
   * @param t
   */
  onDBClick(t) {
    const data = Immutable.cloneDeep(this.state.data);
    const { id } = t;
    const index = data.findIndex((n) => {
      return n.id === id;
    });

    let activeKey;
    if (index === -1) {
      data.push(t);
      activeKey = t.id;
    } else {
      activeKey = data[index].id;
    }
    this.setState(
      {
        data,
        activeKey,
      },
      () => {
        Emitter.trigger(Actions.components.business.canvaspanel.addtab, activeKey);
      },
    );
  }

  /**
   * onChange
   * @param pageId
   */
  onChange = (pageId) => {
    this.setState(
      {
        activeKey: pageId,
      },
      () => {
        Emitter.trigger(Actions.components.business.canvaspanel.changetab, pageId);
      },
    );
  };

  /**
   * onRemoveSymbol
   * @param pageId
   * @param success
   */
  [onRemoveSymbol] = (pageId, success) => {
    const data = [...this.state.data];
    const index = data.findIndex((t) => t.id === pageId);
    data.splice(index, 1);

    let isChangeTab = false;
    let { activeKey } = this.state;
    if (data.length !== 0 && pageId === activeKey) {
      activeKey = data[0].id;
      isChangeTab = true;
    }

    this.setState(
      {
        data,
        activeKey,
      },
      () => {
        Emitter.trigger(Actions.components.business.canvaspanel.removetab, {
          removeKey: pageId,
          activeKey: data.length !== 0 ? activeKey : '',
        });
        if (isChangeTab) {
          Emitter.trigger(Actions.components.business.canvaspanel.changetab, activeKey);
        }

        OpenPageModel.remove(pageId);

        if (success) {
          success();
        }
      },
    );
  };

  /**
   * removePage
   * @param {String} - pageId
   * @param {Function} - success
   */
  removePage({ pageId, success }) {
    this[onRemoveSymbol](pageId, success);
  }

  /**
   * setName
   * @param {String} - pageId
   * @param success
   */
  setName({ pageId, name }, success) {
    const dataClone = Immutable.cloneDeep(this.state.data);
    const tabData = dataClone.find(({ id }) => pageId === id);
    if (tabData) {
      tabData.name = name;
      this.setState(
        {
          data: dataClone,
        },
        () => {
          if (success) {
            success();
          }
        },
      );
    }
  }

  /**
   * renderTabPanels
   * @return {ReactElement}
   */
  renderTabPanels() {
    const { data = [], activeKey } = this.state;

    return data.map((t) => {
      const { name, id: pageId, property } = t;
      return (
        <TabPanel name={name} key={pageId}>
          {/* 一个页面 start */}
          <CanvasTabPanel
            activePageId={activeKey}
            pageId={pageId}
            name={name}
            property={property || CanvasTabPanelPropertyDefaultConfig()}
            getInstance={(ins) => {
              OpenPageModel.add(ins);
            }}
          />
          {/* 一个页面 end */}
        </TabPanel>
      );
    });
  }

  render() {
    const { data = [], activeKey } = this.state;
    return (
      <CanvasPanelContext.Provider
        value={{
          removePage: this.removePage.bind(this),
          setName: this.setName.bind(this),
        }}
      >
        <div className={selectorPrefix}>
          {data.length === 0 ? (
            <CanvasEmptyPanel />
          ) : (
            <Tab activeKey={activeKey} onChange={this.onChange} onRemove={this[onRemoveSymbol]}>
              {this.renderTabPanels()}
            </Tab>
          )}
        </div>
      </CanvasPanelContext.Provider>
    );
  }
}

export default CanvasPanel;
