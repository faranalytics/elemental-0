export declare type ActivatorT = (selector?: {
    [key: string]: (string | ActivatorT);
}, hasEndTag?: boolean) => string;
export declare function $(_name: string, _attr?: {
    [key: string]: string;
}): (..._args: (string | any | ((selector?: {
    [key: string]: string | any;
} | undefined, hasEndTag?: boolean) => string))[]) => (selector?: {
    [key: string]: string | any;
} | undefined, hasEndTag?: boolean) => string;
