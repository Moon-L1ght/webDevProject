import React, { useCallback, useState, useEffect } from 'react';
import Sandbox from './Scenes/Sandbox';
import Menu from './Scenes/Menu';
import { serialize } from 'v8';

type Scene = "Menu" | "Sandbox";

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
          <Menu onStart={ () => setScene("Sandbox")}/>
        </div>
      );
    case "Sandbox":
      return (
        <div className="layout">
          <Sandbox taskName='Task 1' onExit={ () => setScene("Menu") }/>
        </div>
      );
  }
}