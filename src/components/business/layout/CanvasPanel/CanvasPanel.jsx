import React from 'react';
import Tab from '../../../global/CT-UI-Tab/Tab';
import TabPanel from '../../../global/CT-UI-Tab/TabPanel';
import CanvasTabPanel from './CanvasTabPanel';
import CanvasEmptyPanel from './CanvasEmptyPanel';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import PageModel from '../../../../model/PageModel';
import CanvasTabPanelPropertyDefaultConfig from './Property';

import './CanvasPanel.less';

const { Component } = React;

const selectorPrefix = 'CanvasPanel';

/**
 * CanvasPabel
 * @class CanvasPanel
 * @classdesc CanvasPanel
 */
class CanvasPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [/* {
        name,
        id,
        property
      } */],
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
   * @param {Object} - t
   */
  onDBClick(t) {
    const data = [...this.state.data];
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
    this.setState({
      data,
      activeKey,
    }, () => {
      Emitter.trigger(Actions.components.business.canvaspanel.addtab, activeKey);
    });
  }

  /**
   * onChange
   * @param {String} - pageId
   */
  onChange = (pageId) => {
    this.setState({
      activeKey: pageId,
    }, () => {
      Emitter.trigger(Actions.components.business.canvaspanel.changetab, pageId);
    });
  };

  /**
   * onRemove
   * @param {String} - pageId
   */
  onRemove = (pageId) => {
    const data = [...this.state.data];
    const index = data.findIndex(t => t.id === pageId);
    data.splice(index, 1);

    let isChangeTab = false;
    let { activeKey } = this.state;
    if (data.length !== 0 && pageId === activeKey) {
      activeKey = data[0].id;
      isChangeTab = true;
    }

    this.setState({
      data,
      activeKey,
    }, () => {
      Emitter.trigger(Actions.components.business.canvaspanel.removetab, {
        removeKey: pageId,
        activeKey,
      });
      if (isChangeTab) {
        Emitter.trigger(Actions.components.business.canvaspanel.changetab, activeKey);
      }

      PageModel.remove(pageId);
    });
  };

  render() {
    const { data = [], activeKey } = this.state;
    return (
      <div className={selectorPrefix}>
        {
          data.length === 0 ?
          (<CanvasEmptyPanel />) :
          <Tab
            activeKey={activeKey}
            onChange={this.onChange}
            onRemove={this.onRemove}
          >
            {
              data.map((t) => {
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
                          PageModel.add(ins);
                        }}
                      />
                      {/* 一个页面 end */}
                    </TabPanel>
                  );
              })
            }
          </Tab>
        }
      </div>
    );
  }
}

export default CanvasPanel;
