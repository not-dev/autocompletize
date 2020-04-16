/*! Be licensed under the terms of the MIT license. */
interface AutocompleteDatalist {
    target: HTMLInputElement;
    data: Array<string>;
}
declare const autocomplete: {
    state: number;
    shift: boolean;
    init: () => void;
    clear: (target: HTMLInputElement) => void;
    update: ({ target, data }: AutocompleteDatalist) => void;
};
export default autocomplete;
