import {createStore, action} from 'easy-peasy'

const store = createStore({
    count: 0,
    plusCount: action((state, payload) => {
        state.count ++
    })
});
export default store;