import React, { useCallback, useState, useEffect } from 'react';
import Sandbox from './Scenes/Sandbox';
import Menu from './Scenes/Menu';

type Scene = "menu" | "Sandbox";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.electronAPI) setReady(true);
  }, []);

  const [scene, setScene] = useState<Scene>("menu");

  switch (scene) {
    case "menu":
      return (
        <div className="layout">
          <Menu onStart={ () => setScene("Sandbox")}/>
        </div>
      );
    case "Sandbox":
      return (
        <div className="layout">
          <Sandbox/>
        </div>
      );
  }
}