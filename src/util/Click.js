export default (callback, beforeClick) => {
  let count = 0;
  let handler;

  return (e) => {
    if (beforeClick) {
      beforeClick(e);
    }
    if (!handler) {
      handler = window.setTimeout(() => {
        window.clearTimeout(handler);
        if (callback) {
          callback(count);
        }
        count = 0;
      }, 200);
    }
    count++;
  };
};
