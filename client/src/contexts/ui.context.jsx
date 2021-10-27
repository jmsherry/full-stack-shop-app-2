import React, { createContext, useState } from "react";

export const UIContext = createContext({
  menu: {
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
});

export const UIProvider = (props) => {
  const [isOpen, setState] = useState(false);
  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => {setState(!isOpen)};
  return (
    <UIContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};
