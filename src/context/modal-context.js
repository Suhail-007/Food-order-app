import React from 'react';

const ModalContext = React.createContext(() => {
  return { toggleCart: () => {} }
});

export default ModalContext;