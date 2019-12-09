import { getMaxLevelNumber } from './ComponentBaseHOC';

/**
 * DRSStyle
 * @class DRSStyle
 * @class DRS的样式管理
 */
class DRSStyle {
  /**
   * getStyle
   * @param {Object} - style
   * @return {Object}
   */
  getStyle(style) {
    const {
      active = false,
      property: {
        style: {
          position: {
            left,
            top,
          },
          dimension: {
            width,
            height,
          },
          opacity,
          lineheight,
          zindex,
        },
      },
    } = style;

    return Object.assign(
      {
        zIndex: active ? getMaxLevelNumber() : zindex,
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        boxShadow: this.getBoxShadowStyle(style),
        opacity: opacity / 100,
        lineHeight: lineheight,
      },
      this.getBorderStyle(style),
      this.getBorderRadiusStyle(style),
      this.getFontFamilyStyle(style),
      this.getAlignStyle(style),
    );
  }

  /**
   * getBoxShadowStyle
   * @param {Object} - style
   * @returns {String}
   */
  getBoxShadowStyle(style) {
    const {
      property: {
        style: {
          shadow: {
            inset,
            outset,
          },
        },
      },
    } = style;

    const boxShadow = [];

    if (!inset.disabled) {
      boxShadow.push(`inset ${inset.offsetX}px ${inset.offsetY}px ${inset.blurRadius}px ${inset.spreadRadius}px ${inset.color}`);
    }

    if (!outset.disabled) {
      boxShadow.push(`${outset.offsetX}px ${outset.offsetY}px ${outset.blurRadius}px ${outset.spreadRadius}px ${outset.color}`);
    }

    return boxShadow.join(',');
  }

  /**
   * getBorderStyle
   * @param {Object} - style
   * @returns {Object}
   */
  getBorderStyle(style) {
    const {
      property: {
        style: {
          border: {
            borderLeftDisable,
            borderRightDisable,
            borderTopDisable,
            borderBottomDisable,
            borderWidth,
            borderStyle,
            borderColor,
          },
        },
      },
    } = style;

    return Object.assign({},
      !borderLeftDisable ? { borderLeft: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
      !borderRightDisable ? { borderRight: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
      !borderTopDisable ? { borderTop: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
      !borderBottomDisable ? { borderBottom: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
    );
  }

  /**
   * getBorderRadiusStyle
   * @param {Object} - style
   * @return {Object}
   */
  getBorderRadiusStyle(style) {
    const {
      property: {
        style: {
          radius: {
            borderLeftTopRadiusDisable,
            borderRightTopRadiusDisable,
            borderLeftBottomRadiusDisable,
            borderRightBottomRadiusDisable,
            radius,
          },
        },
      },
    } = style;

    return Object.assign({},
      !borderLeftTopRadiusDisable ? { borderTopLeftRadius: `${radius}px` } : null,
      !borderRightTopRadiusDisable ? { borderTopRightRadius: `${radius}px` } : null,
      !borderLeftBottomRadiusDisable ? { borderBottomLeftRadius: `${radius}px` } : null,
      !borderRightBottomRadiusDisable ? { borderBottomRightRadius: `${radius}px` } : null,
    );
  }

  /**
   * getFontFamilyStyle
   * @param {Object} - style
   * @return {Object}
   */
  getFontFamilyStyle(style) {
    const {
      property: {
        style: {
          fontfamily: {
            // fontFamily 字体
            fontFamily,
            // fontSize 大小
            fontSize,
            // fontWeight 加粗
            fontWeight,
            // fontStyle 倾斜
            fontStyle,
            // textDecoration 下划线
            textDecoration,
            // color 颜色
            color,
            // 阴影
            textShadow: {
              // 是否启用
              disabled,
              // 水平阴影的位置
              hShadow,
              // 垂直阴影的位置
              vShadow,
              // 模糊的距离
              blur,
              // 颜色
              color: shadowColor,
            },
          },
        },
      },
    } = style;

    return Object.assign({
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight ? 'bold' : 'normal',
      fontStyle: fontStyle ? 'italic' : 'normal',
      textDecoration: textDecoration ? 'underline' : 'none',
      color,
    },
    !disabled ? { textShadow: `${hShadow}px ${vShadow}px ${blur}px ${shadowColor}` } : null
    );
  }

  /**
   * getAlignStyle
   * @param {Object} - style
   * @return {Object}
   */
  getAlignStyle(style) {
    const {
      property: {
        style: {
          /* ---对其---*/
          align: {
            // 水平左
            hleft,
            // 水平右
            hright,
            // 水平居中
            hcenter,

            // 垂直上
            vtop,
            // 垂直居中
            vcenter,
            // 垂直下
            vbottom,
          },
        },
      },
    } = style;

    return {
      display: 'flex',
      justifyContent: hleft ? 'flex-start' : (hcenter ? 'center' : 'flex-end'),
      alignItems: vtop ? 'flex-start' : (vcenter ? 'center' : 'flex-end'),
    };
  }
}

export default DRSStyle;
