export default {
  /**
   * captureName - 首字母大写
   * @param {String} - name
   * @return {string}
   */
  captureName(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  },
};
