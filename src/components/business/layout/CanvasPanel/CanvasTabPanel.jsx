import React from 'react';
import PropTypes from 'prop-types';

import MouseWheel from '../../../../util/MouseWheel';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import {
  DRSSELECTORPREFIX,
  DROPPABLESELECTORPREFIX,
  SCALECOLLECTION } from '../../../../util/Constant';

import CanvasTabPanelKeyBoard from './CanvasTabPanelKeyBoard';
import CanvasTabPanelStyle from './CanvasTabPanelStyle';

import { CanvasPanelContext } from './CanvasPanelContext';

import './CanvasTabPanel.less';


const selectorPrefix = 'CanvasTabPanel';

export { selectorPrefix };

/**
 * CanvasTabPanel
 */
class CanvasTabPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pageKeyBoard = new CanvasTabPanelKeyBoard(this);
    this.pageStyle = new CanvasTabPanelStyle();

    this.state = {
      property: Object.assign({}, props.property),
    };

    this.scaleIndex = 7;

    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  componentDidMount() {
    const { getInstance } = this.props;
    if (getInstance) {
      getInstance(this);
    }
  }

  /**
   * getPageId
   * @return {String}
   */
  getPageId() {
    const { pageId } = this.props;
    return pageId;
  }

  /**
   * getPageName
   * @return {String}
   */
  getPageName() {
    const { name } = this.props;
    return name;
  }

  /**
   * getProperty
   * @return {Object}
   */
  getProperty() {
    // const { property } = this.props;
    // return Immutable.cloneDeep(property);
    return Object.assign({}, this.state.property);
  }

  /**
   * 根据propertyName设置Property的值
   * @param {String} - propertyName
   * @param {Object} - propertyValue
   * @param {Function} -success
   */
  setPropertyByProps(propertyName, propertyValue, success) {
    console.log(this.props);
    const property = { ...this.state.property };
    property[propertyName] = propertyValue;
    this.setState({
      property,
    }, () => {
      if (success) {
        success();
      }
    });
  }

  /**
   * setActiveShape
   * @param {Shape} shape
   */
  setActiveShape(shape) {
    this.activeShape = shape;
  }

  /**
   * getActiveShape
   * @return {Shape}
   */
  getActiveShape() {
    return this.activeShape;
  }

  /**
   * getDRSClassName
   * @return {string}
   */
  getDRSClassName() {
    return DRSSELECTORPREFIX.join(' ');
  }


  /**
   * bindKeyBoard
   */
  bindKeyBoard() {
    this.pageKeyBoard.bindKeyBoard();
  }

  /**
   * unBindKeyBoard
   */
  unBindKeyBoard() {
    this.pageKeyBoard.unBindKeyBoard();
  }

  /**
   * bindMouseWheel
   */
  bindMouseWheel() {
    MouseWheel.on(this.onMouseWheel);
  }

  /**
   * unBindMouseWheel
   */
  unBindMouseWheel() {
    MouseWheel.off(this.onMouseWheel);
  }

  /**
   * onMouseWheel
   * @param {String} - direction [top | bottom]
   */
  onMouseWheel({
    direction,
  }) {
    if (direction === 'top') {
      if (this.scaleIndex !== 0) {
        this.scaleIndex--;
      }
    } else if (direction === 'bottom') {
      if (this.scaleIndex !== SCALECOLLECTION.length - 1) {
        this.scaleIndex++;
      }
    }

    const scale = this.getScale();
    this.innerEl.style.transform = `scale(${scale})`;
    Emitter.trigger(Actions.components.business.canvaspanel.mousewheel, scale);
  }

  /**
   * getScale
   * @return {number}
   */
  getScale() {
    return SCALECOLLECTION[this.scaleIndex];
  }

  render() {
    const { activePageId, pageId } = this.props;
    return (
      <CanvasPanelContext.Consumer>{({
         removePage,
         setName,
      }) => {
        this.removePage = removePage;
        this.setName = setName;

        return (
          <div
            className={`${selectorPrefix} ${activePageId === pageId ? `${DROPPABLESELECTORPREFIX}-target` : ''}`}
            data-pageid={pageId}
          >
            <div
              className={`${selectorPrefix}-Background`}
              style={this.pageStyle.getStyle(Immutable.cloneDeep(this.state))}
            />
            <div
              className={`${selectorPrefix}-Scroll ${activePageId === pageId ? this.getDRSClassName() : ''}`}
              data-pageid={pageId}
              id={pageId}
              ref={(el) => {
                this.innerEl = el;
              }}
            />
          </div>
        );
      }}
      </CanvasPanelContext.Consumer>
    );
  }
}

CanvasTabPanel.defaultProps = {
  activePageId: '',
  name: '',
  pageId: '',
  property: {},
};

CanvasTabPanel.propTypes = {
  activePageId: PropTypes.string,
  // page的name
  name: PropTypes.string,
  // page的id
  pageId: PropTypes.string,
  // page的属性
  property: PropTypes.object,
  getInstance: PropTypes.func,
};

export default CanvasTabPanel;
