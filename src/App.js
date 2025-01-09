import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CoachingPage from "./components/CoachingPage";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CoachingPage />
    </DndProvider>
  );
}

export default App;
