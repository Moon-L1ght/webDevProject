interface Props {
    htmlTasklist: Array<Object>;
    cssTasklist: Array;
    jsTasklist: Array;
}

// [
//     {
//         theme: "1",
//         tasks: [{
//
//         }],
//     }
// ]

export default function TaskList(htmlTasklist, cssTasklist: Array, jsTasklist: Array): Props {
    return (
        <>
            <div className="themes-title">
                <h1 className="themes-text">Themes</h1>
            </div>
            <div className="task-menu">
                <div className="task-theme">
                    <h2 className="task-theme-title">HTML</h2>
                    <div className="task-theme-item">
                        <ul className="task-theme-list">
                            {/*{*/}
                            {/*    htmlTasklist.map(item => {*/}
                            {/*            <ol className="task-list-item">*/}
                            {/*                <h3>{item.name}</h3>*/}
                            {/*            </ol>*/}
                            {/*        }*/}
                            {/*    )*/}
                            {/*}*/}
                        </ul>
                    </div>
                </div>
                <div className="task-theme">
                    <h2 className="task-theme-title">CSS</h2>
                    <div className="task-theme-item">
                        <ul className="task-theme-list">

                        </ul>
                    </div>
                </div>
                <div className="task-theme">
                    <h2 className="task-theme-title">JS</h2>
                    <div className="task-theme-item">
                        <ul className="task-theme-list">

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}