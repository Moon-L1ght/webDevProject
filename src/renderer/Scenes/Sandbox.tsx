import React, { useCallback, useState, useEffect } from 'react';
import Titlebar from './components/Titlebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Console from './components/Console';

type Props = {
    taskName?: string;
}

export default function Sandbox({ taskName }: Props) {

    const [html, setHtml] = useState('<h1>Hello, world!</h1>');
    const [css, setCss] = useState(
        'h1 { color: #ffffffff; font-family: system-ui, sans-serif; }'
    );
    const [js, setJs] = useState('console.log("JS ready");');

    const onChange = useCallback(
        (lang: 'html' | 'css' | 'js', value: string) => {
            if (lang === 'html') setHtml(value);
            if (lang === 'css') setCss(value);
            if (lang === 'js') setJs(value);
        },[]
    );

    return(
        <div className="layout">
            <div className="pane pane-top">
                <Titlebar titleName='' taskName={taskName}/>
            </div>
            <div className="pane pane-bottom">
                <div className="pane pane-left">
                    <Editor html={html} css={css} js={js} onChange={onChange} />
                </div>
                <div className="pane pane-right">
                    <Preview html={html} css={css} js={js} />
                    <Console />
                </div>
            </div>
        </div>
    );
};