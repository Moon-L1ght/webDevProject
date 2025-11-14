import React, { useEffect, useState } from 'react';
// @ts-ignore
import ReactLogo from '../../../assets/react.svg';
import { title } from 'process';

type Props = {
	titleName?: string
	taskName?: string
}

export default function TitleBar({titleName, taskName}: Props) {
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
			<div className="titlebar-title">{titleName ? titleName : "Web Sandbox"} {taskName ? ": " + taskName : ""}</div>
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