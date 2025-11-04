import React, { useEffect, useState } from 'react';
import Titlebar from "../components/Titlebar";
import Menubody from "../components/Menubody";

interface Props {
  onStart: () => void;
}

export default function Menu({ onStart }: Props ) {
    return (
        <div className="layout">
            <div className="pane pane-top">
                <Titlebar titleName='' taskName=''/>
            </div>
            <Menubody onStart={ onStart }/>
        </div>
    );
};