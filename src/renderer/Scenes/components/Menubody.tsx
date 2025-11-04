import React, { useEffect, useState } from 'react';

interface Props {
    onStart: () => void;
};

export default function Menubody({ onStart }: Props) {
    return (
        <div className="menu">
            <div className="menu-label">
                <div className="menu-text">
                    <h1 className="menu-title">Welcome to Web Sandbox!</h1>
                    <p className="menu-p">To start - click button below</p>
                </div>
                <div className="menu-controller">
                    <button onClick={ onStart } >Get started!</button>
                </div>
            </div>
        </div>
    );
};