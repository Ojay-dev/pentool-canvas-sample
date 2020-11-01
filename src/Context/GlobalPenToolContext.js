import React, { createContext, useState, useContext } from "react";

const GlobalPenToolContext = createContext();
const GlobalPenToolActionsContext = createContext();
const GlobalUndoContext = createContext();
const GlobalUndoActionsContext = createContext();

const factoryUseContext = (name, context) => {
  return () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(
        `use${name}Context must be used withing a ${name}ContextProvider.`
      );
    }
    return ctx;
  };
};


export const useGlobalPenToolContext = factoryUseContext(
  "GlobalPenToolContext",
  GlobalPenToolContext
);

export const useGlobalPenToolActionsContext = factoryUseContext(
  "GlobalPenToolActionsContext",
  GlobalPenToolActionsContext
);

export const useGlobalUndoContext = factoryUseContext(
  "GlobalUndoContext",
  GlobalUndoContext
);

export const useGlobalUndoActionsContext = factoryUseContext(
  "GlobalUndoActionsContext",
  GlobalUndoActionsContext
);


const GlobalPenToolContextProvider = (props) => {
  const [isPenTool, setPenTool] = useState(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);

  return (
    <GlobalPenToolContext.Provider value={isPenTool}>
      <GlobalPenToolActionsContext.Provider value={setPenTool}>
        <GlobalUndoContext.Provider value={undo}>
          <GlobalUndoActionsContext.Provider value={setUndo}>
            {props.children}
          </GlobalUndoActionsContext.Provider>
        </GlobalUndoContext.Provider>
      </GlobalPenToolActionsContext.Provider>
    </GlobalPenToolContext.Provider>
  );
};

export default GlobalPenToolContextProvider;
