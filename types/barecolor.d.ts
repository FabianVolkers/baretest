declare module 'barecolor' {
    const rgb: Barecolor
    export default rgb
}

export interface Barecolor {
    black: (s: string) => void
    blackln: (s: string) => void
    red: (s: string) => void
    redln: (s: string) => void
    green: (s: string) => void
    greenln: (s: string) => void
    yellow: (s: string) => void
    yellowln: (s: string) => void
    blue: (s: string) => void
    blueln: (s: string) => void
    magenta: (s: string) => void
    magentaln: (s: string) => void
    cyan: (s: string) => void
    cyanln: (s: string) => void
    white: (s: string) => void
    whiteln: (s: string) => void
    gray: (s: string) => void
    grayln: (s: string) => void
}
