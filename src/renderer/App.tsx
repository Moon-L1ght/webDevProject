import React, { useCallback, useState, useEffect } from 'react';
import Sandbox from './Scenes/Sandbox';
import Menu from './Scenes/Menu';
import { serialize } from 'v8';
import TaskMenu from "@/Scenes/TaskMenu";

type Scene = "Menu" | "TaskMenu" | "Sandbox";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.electronAPI) setReady(true);
  }, []);

  const [scene, setScene] = useState<Scene>("Menu");

  switch (scene) {
    case "Menu":
      return (
        <div className="layout">
          <Menu onStart={ () => setScene("TaskMenu") } />
        </div>
      );

    case "TaskMenu":
      return (
          <div className="layout">
            <TaskMenu titleName="Tasks"/>
          </div>
      );

    case "Sandbox":
      return (
        <div className="layout">
          <Sandbox  titleName="aboba" taskName='Task 1' onExit={ () => setScene("Menu") }/>
        </div>
      );
  }
}