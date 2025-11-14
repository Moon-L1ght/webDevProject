import React, { useEffect, useState } from 'react';
import Titlebar from "@/Scenes/components/Titlebar";
import TaskList from "@/Scenes/components/TaskList";

interface Props {
    titleName: string;
}

export default function TaskMenu({titleName}: Props) {


    return (
        <>
            <Titlebar titleName={titleName} />
            <TaskList />
        </>
    );

}