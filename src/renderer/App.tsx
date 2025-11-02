import React, { useCallback, useState } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Console from './components/Console'

export default function App() {
    const [html, setHtml] = useState('<h1>Hello, world!</h1>')
    const [css, setCss] = useState('h1 { color: #4f46e5; font-family: system-ui, sans-serif; }')
    const [js, setJs] = useState('console.log("JS ready");')

    const onChange = useCallback((lang: 'html' | 'css' | 'js', value: string) => {
        if (lang === 'html') setHtml(value)
        if (lang === 'css') setCss(value)
        if (lang === 'js') setJs(value)
    }, [])

    return (
        <div className="layout">
            <div className="pane pane-left">
                <Editor html={html} css={css} js={js} onChange={onChange} />
            </div>
            <div className="pane pane-right">
                <Preview html={html} css={css} js={js} />
                <Console />
            </div>
        </div>
    )
}