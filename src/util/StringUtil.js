export default {
  /**
   * captureName - 首字母大写
   * @return {string}
   * @param name
   */
  captureName(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  },
};
