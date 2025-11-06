import React, { useEffect, useState } from 'react'
import type { IframeMessage } from '../../types/messages'

export default function Console() {
    const [logs, setLogs] = useState<Array<{ level: string; text: string }>>([])

    useEffect(() => {
        const handler = (e: MessageEvent) => {
            const data = e.data as IframeMessage
            if (!data || typeof data !== 'object') return
            if ((data as any).__from !== 'preview') return
            if (data.type === 'console') {
                setLogs((prev) => [...prev, { level: data.level, text: data.args.map(String).join(' ') }])
            }
            if (data.type === 'error') {
                setLogs((prev) => [...prev, { level: 'error', text: data.msg || data.stack || 'Unknown error' }])
            }
        }
        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, [])

    return (
        <div className="console">
            <div className="console-header">Console</div>
            <div className="console-body">
                {logs.length === 0 ? <div className="muted">No logs yet</div> : null}
                {logs.map((l, i) => (
                    <div key={i} className={`log ${l.level}`}>
                        <span className="level">[{l.level}]</span> {l.text}
                    </div>
                ))}
            </div>
        </div>
    )
}