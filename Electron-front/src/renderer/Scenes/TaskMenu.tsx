import React, { useEffect, useState } from 'react';
import Titlebar from "@/Scenes/components/Titlebar";
import TaskList from "@/Scenes/components/TaskList";

interface Tasks {
    id?: number;
    title: string;
    completed?: boolean;
}

interface TaskTheme {
    theme: string;
    tasks: Array<Tasks>;
}

interface Props {
    titleName: string;
    htmlTasks: Array<TaskTheme>;
    cssTasks: Array<TaskTheme>;
    jsTasks: Array<TaskTheme>;
}

export default function TaskMenu({ htmlTasks, cssTasks, jsTasks }: Props) {
    return (
        <>
            <Titlebar titleName='1' taskName='2'/>
            <TaskList
                HTMLTasklist={htmlTasks}
                CSSTasklist={cssTasks}
                JSTasklist={jsTasks}
            />
        </>
    );
}