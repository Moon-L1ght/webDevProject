import React, { useEffect, useState } from 'react';

interface Props {
    onExit: () => void;
};

export default function Toolbar({ onExit }: Props) {

    return(
        <div className="pane pane-bottom">
            <div className="pane-bottom-item pane-bottom-left">
                <button id="exit-button" onClick={ onExit }>X</button>
            </div>
            <div className="pane-bottom-item pane-bottom-middle">
                <button>&lt;</button>
                <button>✔</button>
                <button>&gt;</button>
            </div>
            <div className="pane-bottom-item pane-bottom-right">
                <button id="task-button">?</button>
            </div>
        </div>
    );

};