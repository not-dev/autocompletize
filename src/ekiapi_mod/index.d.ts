interface Response {
    target: HTMLInputElement;
    data: Array<string>;
}
export declare function get(apiKey: string, target: HTMLInputElement, callback: ({ target, data }: Response) => void): void;
export {};
