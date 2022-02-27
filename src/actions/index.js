export const SET_NAME = "SET_NAME";
export const TOGGLE_ONLINE = "TOGGLE_ONLINE";
export const setPlayerName = (string)=>{
    return({ type: SET_NAME, payload: string })
}
export const toggleOnline = ()=>{
    return({ type: TOGGLE_ONLINE })
}