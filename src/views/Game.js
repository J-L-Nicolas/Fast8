import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Vibration, Image } from 'react-native'
import {useStoreState} from 'easy-peasy'
import PlayManager from '../components/PlayManager'

// import components
import BtnReloadRef from '../components/game_components/BtnReloadRef'
import Infos from '../components/game_components/Infos'
import SnapSlider from '../components/game_components/SnapSlider'
import TableRef from '../components/game_components/TableRef'
import GameGrid from '../components/game_components/GameGrid'

const Game = () => {

    // init store
    const tableCubes = useStoreState((state) => state.tableCubes);
    
    //init state 
    const [cubeTable, setcubeTable] = useState(tableCubes)
    const [refTable, setrefTable] = useState(PlayManager.generateTabAlt(3, cubeTable))
    const [dataInfos, setdataInfos] = useState({score: 0, move: 0, oldMoves: []})

    //init ref
    const levelPoint = useRef(2)

    //updateRef
    const updateRef = (type = false) => {
        const newValue = levelPoint.current + PlayManager.getRandomInt(3)
        setrefTable(PlayManager.generateTabAlt(newValue, cubeTable))
        type && setdataInfos({...dataInfos, move: 0})
    }

    // init effect
    useEffect(() => {
      const result = PlayManager.comparTabs(cubeTable, refTable, "idColor")
      if (result) {
        updateScore(1)
        updateRef()
        Vibration.vibrate(50)

      }
    }, [cubeTable])

    const updateScore = (id) =>{
        let mewData = {...dataInfos};
        if (id == 0){
            mewData.move += 1
        }else{
            mewData.score += 1
            mewData.oldMoves = [mewData.move , ...mewData.oldMoves]
            if(mewData.oldMoves.length > 4){
                mewData.oldMoves.pop()
            }
            mewData.move = 0
        }
        setdataInfos(mewData)
    }
    
    // change bar animate
    const changeSnap = (level) =>{
        levelPoint.current = level
    }

    // Render
    return (
        <View style={styles.container}>
            <Image 
                source={require("../assets/img/border_cover.png")}
                style={{ resizeMode: "contain", height: "100%", position: 'absolute', top: 0}}
            />
            <View style={styles.containerHeader}>
                <View style={styles.boxInHeader}>
                    <TableRef table={refTable}/>
                    <BtnReloadRef refUpdate={updateRef} />
                </View>
                <SnapSlider snapValue={changeSnap}/>
            </View>
            <View style={styles.containerBody}>
                <GameGrid key={cubeTable}  tableGame={cubeTable} changeTableGame={setcubeTable} changeScore={updateScore}/>
                <Infos infos={dataInfos}/>
            </View>
        </View>
    )

}

export default Game

//Style
const styles = StyleSheet.create({
    // style in game component
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#383e6e",
        paddingHorizontal: 10,
    },
    containerHeader:{
        width: "100%",
        padding: 10,
        backgroundColor: "#515ba1cc",
        borderRadius: 30,
        marginTop: 50,
    },
    boxInHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerBody:{
        width: "100%",
        padding: 20,
        backgroundColor: "#515ba1",
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 25,
    },
})