import {createStore, action, computed} from 'easy-peasy'
import Colors from '../components/Colors'

const store = createStore({
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
    stringLang: {
        en:{
            btn1: "Play",
            btn2: "Setting",
            btn3: "More Game",
            btn4: "Exit",
            sliderText_1: "Easy",
            sliderText_2: "Medium",
            sliderText_3: "Hard",
            scoreText: "Score",
            movesText: "Moves",
            textOLMove: "Old Movements"
        },
        fr:{
            btn1: "Joué",
            btn2: "Paramètres",
            btn3: "Plus de jeu",
            btn4: "Sortie",
            sliderText_1: "Facile",
            sliderText_2: "Moyen",
            sliderText_3: "Difficile",
            scoreText: "Score",
            movesText: "Movements",
            textOLMove: "Anciens mouvements"
        }
    },
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
    getColors: computed(state =>  Colors[state.colorMode])
   
});
export default store;