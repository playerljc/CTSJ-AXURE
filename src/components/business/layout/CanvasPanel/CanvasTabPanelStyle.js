/**
 * CanvasTabPanelStyle
 * @class CanvasTabPanelStyle
 * @classdesc 页面的样式管理
 */
class CanvasTabPanelStyle {
  /**
   * getBackgroundPositionStyle
   * @param {Object} - style
   * @return {Object}
   */
  getBackgroundPositionStyle(style) {
    const {
      property: {
        style: { fillimg },
      },
    } = style;

    const xkey = ['left', 'hcenter', 'right'];
    const ykey = ['top', 'vcenter', 'bottom'];
    return {
      backgroundPositionX: xkey.filter((key) => fillimg[key])[0].replace('hcenter', 'center'),
      backgroundPositionY: ykey.filter((key) => fillimg[key])[0].replace('vcenter', 'center'),
    };
  }

  /**
   * getBackgroundRepeatStyle
   * @param {Object} - style
   * @return {Object}
   */
  getBackgroundRepeatStyle(style) {
    const {
      property: {
        style: {
          fillimg: { repeat },
        },
      },
    } = style;

    const exclude = ['fill', 'fit'];
    const includex = ['repeat', 'repeatx'];
    const includey = ['repeat', 'repeaty'];
    return {
      backgroundRepeatX: exclude.includes(repeat)
        ? 'no-repeat'
        : includex.includes(repeat)
        ? 'repeat'
        : 'no-repeat',
      backgroundRepeatY: exclude.includes(repeat)
        ? 'no-repeat'
        : includey.includes(repeat)
        ? 'repeat'
        : 'no-repeat',
    };
  }

  /**
   * getBackgroundSizeStyle
   * @param {Object} - style
   * @return {Object}
   */
  getBackgroundSizeStyle(style) {
    const {
      property: {
        style: {
          fillimg: { repeat },
        },
      },
    } = style;

    const include = ['fill', 'fit'];

    return {
      backgroundSize: include.includes(repeat) ? (repeat === 'fill' ? 'contain' : 'auto') : 'auto',
    };
  }

  /**
   * getStyle
   * @param {Object} - style
   * @return {Object}
   */
  getStyle(style) {
    const {
      property: {
        style: {
          fill: { backgroundColor },
          fillimg: { backgroundImg },
        },
      },
    } = style;

    return {
      backgroundColor,
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
      ...this.getBackgroundPositionStyle(style),
      ...this.getBackgroundRepeatStyle(style),
      ...this.getBackgroundSizeStyle(style),
    };
  }
}

export default CanvasTabPanelStyle;
