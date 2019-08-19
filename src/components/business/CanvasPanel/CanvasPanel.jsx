import React from 'react';
import Tab from '../../global/Tab/Tab';
import TabPanel from '../../global/Tab/TabPanel';
import Emitter from '../../../util/Emitter';

import './CanvasPanel.less';
import Actions from '../../../util/Actions';

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
      data: [],
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
      Emitter.trigger(Actions.components.business.canvaspanel.tabchange, pageId);
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
    let activeKey = this.state.activeKey;
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
        Emitter.trigger(Actions.components.business.canvaspanel.tabchange, activeKey);
      }
    });
  };

  /**
   * onTabClick
   * @param {String} - pageId
   */
  onTabClick(pageId) {
    Emitter.trigger(Actions.components.business.canvaspanel.tabclick, pageId);
  }

  render() {
    const { data = [], activeKey } = this.state;
    return (
      <div className={selectorPrefix}>
        <Tab
          activeKey={activeKey}
          onChange={this.onChange}
          onRemove={this.onRemove}
        >
          {
            data.map((t) => {
              const { name, id: pageId } = t;
              return (
                <TabPanel name={name} key={pageId}>
                  <div
                    className={`${selectorPrefix}-TabDroppable ${activeKey === pageId ? 'ct-droppable-target' : ''}`}
                    data-pageid={pageId}
                  >
                    <div
                      className={`${selectorPrefix}-TabScroll ${activeKey === pageId ? 'ct-drag ct-resizeable' : ''}`}
                      data-pageid={pageId}
                      id={pageId}
                      onClick={() => {
                        this.onTabClick(pageId);
                      }}
                    />
                  </div>
                </TabPanel>
              );
            })
          }
        </Tab>
      </div>
    );
  }
}

export default CanvasPanel;
