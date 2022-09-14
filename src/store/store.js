import {createStore, action} from 'easy-peasy'

const store = createStore({
    tableCubes: [
        {id: 0, color: "#ff0000", idColor: "red", active: true},
        {id: 1, color: "#ff0000", idColor: "red", active: true},
        {id: 2, color: "#00c210", idColor: "green", active: true},
        {id: 3, color: "#0927ae", idColor: "blue", active: true},
        {id: 4, color: "#0927ae", idColor: "blue", active: true},
        {id: 5, color: "#0927ae", idColor: "blue", active: true},
        {id: 6, color: "#e7eb00", idColor: "yellow", active: true},
        {id: 7, color: "#ad0bd5", idColor: "violet", active: true},
        undefined
    ],
    count: 0,
    plusCount: action((state, payload) => {
        state.count ++
    })
});
export default store;