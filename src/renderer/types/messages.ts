export type ConsoleLevel = 'log' | 'info' | 'warn' | 'error'

export type IframeConsoleMessage = {
    __from: 'preview'
    type: 'console'
    level: ConsoleLevel
    args: unknown[]
}

export type IframeErrorMessage = {
    __from: 'preview'
    type: 'error'
    msg?: string
    stack?: string
}

export type IframeMessage = IframeConsoleMessage | IframeErrorMessage