// import React, { useCallback, useState, useEffect } from 'react';
// import Sandbox from './Scenes/Sandbox';
// import Menu from './Scenes/Menu';
// import { serialize } from 'v8';
// import TaskMenu from "@/Scenes/TaskMenu";
//
// type Scene = "Menu" | "TaskMenu" | "Sandbox";
//
// export default function App() {
//     const [ready, setReady] = useState(false);
//     useEffect(() => {
//         if (window.electronAPI) setReady(true);
//     }, []);
//
//     const [scene, setScene] = useState<Scene>("Menu");
//
//     switch (scene) {
//         case "Menu":
//             return (
//                 <div className="layout">
//                     <Menu onStart={ () => setScene("TaskMenu") } />
//                 </div>
//             );
//
//         case "TaskMenu":
//             return (
//                 <div className="layout">
//                     <TaskMenu titleName="Tasks"/>
//                 </div>
//             );
//
//         case "Sandbox":
//             return (
//                 <div className="layout">
//                     <Sandbox  titleName="aboba" taskName='Task 1' onExit={ () => setScene("Menu") }/>
//                 </div>
//             );
//     }
// }

// В родительском компоненте
import TaskList from "./Scenes/components/TaskList";
import Titlebar from "./Scenes/components/Titlebar";

export default function App() {
    const htmlTasks: Array<TaskTheme> = [
        {
            theme: "Basic Tags",
            tasks: [
                { id: 1, title: "Learn about <div>", completed: true },
                { id: 2, title: "Understand semantic HTML", completed: false }
            ]
        }
    ];

    const cssTasks: Array<TaskTheme> = [
        {
            theme: "Flexbox",
            tasks: [
                { id: 1, title: "Learn flex-direction", completed: true },
                { id: 2, title: "Practice justify-content", completed: false }
            ]
        }
    ];

    const jsTasks: Array<TaskTheme> = [
        {
            theme: "Arrays",
            tasks: [
                { id: 1, title: "Learn array methods", completed: false },
                { id: 2, title: "Practice map/filter/reduce", completed: false }
            ]
        }
    ];

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
};