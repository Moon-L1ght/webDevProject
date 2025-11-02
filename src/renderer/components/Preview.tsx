import React, { useEffect, useMemo, useRef } from 'react'
import { buildSrcDoc } from '../sandbox/buildSrcDoc'

type Props = { html: string; css: string; js: string }

export default function Preview({ html, css, js }: Props) {
    const srcDoc = useMemo(() => buildSrcDoc({ html, css, js }), [html, css, js])
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return
        iframe.srcdoc = srcDoc
    }, [srcDoc])

    return (
        <div className="preview">
            <div className="preview-header">Preview (sandboxed)</div>
            <iframe
                ref={iframeRef}
                // allow-same-origin чтобы CSP внутри srcdoc был независим (и упростить dev)
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
                style={{ width: '100%', height: '38vh', border: '1px solid #333', background: '#111' }}
                title="preview"
            />
        </div>
    )
}