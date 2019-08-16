import React from 'react';
import Tree from '../../global/Tree/Tree';
import Actions from '../../../util/Actions';
import Emitter from '../../../util/Emitter';
import './PagePanel.less';

const { Component } = React;

const selectorPrefix = 'PagePanel';

class PagePanel extends Component {
  constructor(pros) {
    super(pros);

    this.state = {
      data: [
        {
          name: '1',
          leaf: false,
          icon: 'file-o',
          open: true,
          id: 't1',
          childrendata: [{
            name: '1.1',
            id: 't1.1',
            icon: 'file-o',
            leaf: false,
            open: true,
            childrendata: [{
              name: '1.2',
              id: 't1.2',
              icon: 'file-o',
              leaf: true,
            }],
          }],
        }, {
          name: '2',
          id: 't2',
          leaf: false,
          open: true,
          icon: 'file-o',
          childrendata: [{
            name: '2.1',
            id: 't2.1',
            icon: 'file-o',
            leaf: false,
            open: true,
            childrendata: [{
              name: '2.2',
              id: 't2.2',
              icon: 'file-o',
              leaf: true,
            }],
          }],
        }],
      activeKey: '',
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    Emitter.on(Actions.components.business.canvaspanel.tabchange, this.onTabChange);
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.tabchange, this.onTabChange);
  }

  onTabChange(key) {
    this.setState({
      activeKey: key,
    });
  }

  render() {
    const { data, activeKey } = this.state;
    return (
      <div className={`${selectorPrefix}`}>
        <Tree
          data={data}
          activeKey={activeKey}
          onActive={(key) => {
            this.setState({
              activeKey: key,
            });
          }}
          onDBClick={(t) => {
            Emitter.trigger(Actions.components.business.pagepanel.dbclick, t);
          }}
        />
      </div>
    );
  }
}

export default PagePanel;
