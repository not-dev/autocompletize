/*! Be licensed under the terms of the MIT license. */
interface Response {
    target: HTMLInputElement;
    data: Array<string>;
}
declare const getEkiList: (apiKey: string, target: HTMLInputElement, callback: ({ target, data }: Response) => void) => void;
export { getEkiList };
