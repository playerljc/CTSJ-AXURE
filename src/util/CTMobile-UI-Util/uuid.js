/**
 * uuid
 * @param count
 * @return {string}
 */
export default (count = 8) => {
  const str = new Array(count);
  for (let i = 0; i < count; i++) {
    str.push('x');
  }

  return str.join('').replace(/x/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
