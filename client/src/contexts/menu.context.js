import React, { createContext, useState } from "react";

export const MenuContext = createContext({
  menu: {
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
});

export const MenuProvider = (props) => {
  const [isOpen, setState] = useState(false);
  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => {setState(!isOpen)};
  return (
    <MenuContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
