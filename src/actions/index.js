export const SET_NAME = 'SET_NAME';

export const setName = (string) => {
    return({ type: SET_NAME, payload: string})
}