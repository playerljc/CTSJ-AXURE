import React from 'react';

import SplitFactory from '../../../global/CT-UI-Split/split';
import Accordion from '../../../global/CT-UI-Accordion/Accordion';
import CardAccordionItem from '../../../global/CT-UI-Accordion/CardAccordionItem';

import PagePanel from '../PagePanel/PagePanel';
import ComponentPanel from '../ComponentPanel/ComponentPanel';

import './FunctionalPanel.less';

const { Component } = React;

const selectorPrefix = 'FunctionalPanel';

/**
 * FunctionalPanel
 * @class FunctionalPanel
 * @classdesc FunctionalPanel
 */
class FunctionalPanel extends Component {
  componentDidMount() {
    SplitFactory.create(document.getElementById(selectorPrefix), {
      direction: 'vertical',
    });
  }

  render() {
    return (
      <Accordion
        className={`ct-split ${selectorPrefix}`}
        id="FunctionalPanel"
      >
        <CardAccordionItem
          className={`ct-split-top ${selectorPrefix}-Item PagePanelGroup`}
          name="page"
          open
          extend={PagePanel.extendComponent({
            onAddFile: () => { this.pagePanelIns.activeNodeInsertFileAfter(); },
            onAddFolder: () => { this.pagePanelIns.activeNodeInsertFolderAfter(); },
            onSearch: () => {},
          })}
        >
          {/* 页面 */}
          <PagePanel ref={ins => this.pagePanelIns = ins} />
        </CardAccordionItem>
        <CardAccordionItem
          className={`ct-split-main ${selectorPrefix}-Item ComponentGroup`}
          name="component"
          open
        >
          {/* 组件 */}
          <ComponentPanel />
        </CardAccordionItem>
      </Accordion>
    );
  }
}

export default FunctionalPanel;
