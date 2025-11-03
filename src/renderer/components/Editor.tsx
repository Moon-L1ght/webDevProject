import React, { useEffect, useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
// import loader from '@monaco-editor/loader'

type Props = {
    html: string
    css: string
    js: string
    onChange: (lang: 'html' | 'css' | 'js', value: string) => void
}

const pad: Number = 10;


export default function Editor({ html, css, js, onChange }: Props) {
    const [tab, setTab] = useState<'html' | 'css' | 'js'>('html')
    const value = tab === 'html' ? html : tab === 'css' ? css : js
    const language = tab === 'html' ? 'html' : tab === 'css' ? 'css' : 'javascript'

    // useEffect(() => {
    //     // локальный путь к ассетам Monaco (скопированы в public/monaco/vs)
    //     loader.config({ paths: { vs: '/monaco/vs' } })
    // }, [])

    return (
        <div className="editor">
            <div className="tabs">
                <button className={tab === 'html' ? 'active' : ''} onClick={() => setTab('html')}>HTML</button>
                <button className={tab === 'css' ? 'active' : ''} onClick={() => setTab('css')}>CSS</button>
                <button className={tab === 'js' ? 'active' : ''} onClick={() => setTab('js')}>JS</button>
            </div>
            <MonacoEditor
                theme="vs-dark"
                language={language}
                value={value}
                onChange={(v) => onChange(tab, v ?? '')}
                options={{
                    fontSize: 14,
                    // padding: {pad},
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                }}                
            />
        </div>
    )
}