import {createStore, action, computed} from 'easy-peasy'
import Colors from '../components/Colors'
import String from '../components/String'

const store = createStore({
    // init cube collection
    tableCubes: [
        {id: 0, color: "#ff0000", idColor: "red", active: true},
        {id: 1, color: "#ff0000", idColor: "red", active: true},
        {id: 2, color: "#00c210", idColor: "green", active: true},
        {id: 3, color: "#0927ae", idColor: "blue", active: true},
        {id: 4, color: "#0927ae", idColor: "blue", active: true},
        {id: 5, color: "#0927ae", idColor: "blue", active: true},
        {id: 6, color: "#b86e00", idColor: "yellow", active: true},
        {id: 7, color: "#ad0bd5", idColor: "violet", active: true},
        undefined
    ],

    // langues
    langues: "en",
    stringLang: String,
    toggleLang: action((state, payload) => {
        if (state.langues === "en"){
            state.langues = "fr"
        }else{
            state.langues = "en"
        }
    }),
    selectLang: action((state, payload) => {
        const local = payload.split("_")[0]
        if (local === "fr"){
            state.langues = "fr"
        }else{
            state.langues = "en"
        }
    }),
     
    // colors manager
    systemColor: true,
    changeSystemColor: action((state, payload) =>{
        state.systemColor = payload
    }),

    colorMode: "light",
    changeColorsMode: action((state, payload) => {

        if(payload.type == 0 && state.systemColor){
            state.colorMode = payload.color
        }else if(payload.type == 1){
            state.colorMode = payload.color
        }
    }),
    getColors: computed(state =>  Colors[state.colorMode]),

    // Vibration
    vibration: true,
    setVibration: action((state, payload) => {
        state.vibration = payload
    }),

    // Sound
    midi: null,
    setMidi: action((state, payload) => {
        state.midi = payload
    }),
    sound: true,
    setSound: action((state, payload) => {
        state.sound = payload
        if(payload){
            state.midi.play()
        }else{
            state.midi.stop()
        }
    }),

    

});
export default store;