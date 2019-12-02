import React from 'react';

/**
 * CanvasPanelContext
 * @type {React.Context<{config: {}}>}
 */
export const CanvasPanelContext = React.createContext({
  removePage: null,
  setName: null,
});
