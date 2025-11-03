import React, { useEffect, useState } from 'react';
import ReactLogo from '../../assets/react.svg';


const TitleBar: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      setReady(true);
      window.electronAPI.onMaximizeChange?.(setIsMaximized);
    }
  }, []);

  if (!ready) return null;

  return (
    <div className="titlebar">
      <div className="titlebar-icon">
        <img src={ReactLogo} alt="@" width={20} height={20}/>
      </div>
      <div className="titlebar-title">Web Sandbox</div>
      <div className="titlebar-buttons">
        <button onClick={() => window.electronAPI.minimize()}>−</button>
        <button onClick={() => window.electronAPI.maximize()}>
          {isMaximized ? '🗗' : '☐'}
        </button>
        <button onClick={() => window.electronAPI.close()}>×</button>
      </div>
    </div>
  );
};

export default TitleBar;
