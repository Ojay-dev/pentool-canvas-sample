import React from 'react';
import GlobalPenToolContextProvider from "./Context/GlobalPenToolContext"
import PenToolCanvas from "./Components/PenToolCanvas"
import Controls from "./Components/Controls"

function App(props) {
  return (
   <GlobalPenToolContextProvider>
     <Controls />
     <PenToolCanvas/>
   </GlobalPenToolContextProvider>
  );
}

export default App;