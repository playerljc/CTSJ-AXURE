/**
 * CanvasTabPanelStyle
 * @class CanvasTabPanelStyle
 * @classdesc 页面的样式管理
 */
class CanvasTabPanelStyle {
  /**
   * getBackgroundPositionStyle
   * @return {Object}
   * @param style
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
      // eslint-disable-next-line no-nested-ternary
      backgroundRepeatX: exclude.includes(repeat)
        ? 'no-repeat'
        : includex.includes(repeat)
        ? 'repeat'
        : 'no-repeat',
      // eslint-disable-next-line no-nested-ternary
      backgroundRepeatY: exclude.includes(repeat)
        ? 'no-repeat'
        : includey.includes(repeat)
        ? 'repeat'
        : 'no-repeat',
    };
  }

  /**
   * getBackgroundSizeStyle
   * @return {Object}
   * @param style
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
      // eslint-disable-next-line no-nested-ternary
      backgroundSize: include.includes(repeat) ? (repeat === 'fill' ? 'contain' : 'auto') : 'auto',
    };
  }

  /**
   * getStyle
   * @return {Object}
   * @param style
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
