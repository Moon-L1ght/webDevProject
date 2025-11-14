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
    HTMLTasklist: Array<TaskTheme>;
    CSSTasklist: Array<TaskTheme>;
    JSTasklist: Array<TaskTheme>;
}

// Вспомогательный компонент для отображения списка задач
function ThemeSection({ title, taskList }: { title: string; taskList: Array<TaskTheme> }) {
    return (
        <div className="task-theme">
            <h2 className="task-theme-title">{title}</h2>
            <div className="task-theme-item">
                <div className="task-theme-list">
                    {taskList.map(item => (
                        <div key={item.theme} className="task-list-item">
                            <h3>{item.theme}</h3>
                            <ol>
                                {item.tasks.map(task => (
                                    <li key={task.id || task.title}>
                                        {task.title}
                                        {task.completed && <span> ✓</span>}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function TaskList({ HTMLTasklist, CSSTasklist, JSTasklist }: Props) {
    return (
        <>
            <div className="themes-title">
                <h1 className="themes-text">Themes</h1>
            </div>
            <div className="task-menu">
                <ThemeSection title="HTML" taskList={HTMLTasklist} />
                <ThemeSection title="CSS" taskList={CSSTasklist} />
                <ThemeSection title="JS" taskList={JSTasklist} />
            </div>
        </>
    );
}