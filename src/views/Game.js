import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, PanResponder, Animated, Vibration, Image } from 'react-native'
import {useStoreState} from 'easy-peasy'
import PlayManager from '../components/PlayManager'

// import components
import BtnReloadRef from '../components/game_components/BtnReloadRef'
import Infos from '../components/game_components/Infos'
import SnapSlider from '../components/game_components/SnapSlider'

const Game = () => {

    // init store
    const tableCubes = useStoreState((state) => state.tableCubes);
    
    //init state 
    const [cubeTable, setcubeTable] = useState(tableCubes)
    const [refTable, setrefTable] = useState(PlayManager.generateTabAlt(3, cubeTable))
    const [dataInfos, setdataInfos] = useState({score: 0, move: 0, oldMoves: []})

    //init ref
    const layoutInfos = useRef(null)
    const layoutTableInfos = useRef([]).current
    const pan = useRef(new Animated.ValueXY()).current;
    const pan2 = useRef(new Animated.ValueXY()).current;
    const colorSelected = useRef(new Animated.Value(8)).current
    const colorSelectedHidde = useRef(new Animated.Value(0)).current
    const levelPoint = useRef(2)

    const panMove = (index) =>{
        const panResponder = useRef(
            PanResponder.create({
                onStartShouldSetPanResponderCapture: (evt, gestureState) =>{
                    pan.setValue({
                        x: layoutTableInfos[index].x,
                        y: layoutTableInfos[index].y
                    });
                    pan2.setValue({
                        x: layoutTableInfos[index].x,
                        y: layoutTableInfos[index].y
                    });
                    colorSelected.setValue(cubeTable[index].id)
                    colorSelectedHidde.setValue(1)
                    return true
                },
              onMoveShouldSetPanResponder: () => true,
              onPanResponderGrant: () => {
                pan.setOffset({
                  x: pan.x._value,
                  y: pan.y._value
                });
              },
              onPanResponderMove: Animated.event(
                [
                  null,
                  { dx: pan.x, dy: pan.y }
                ],
                {useNativeDriver: false}
              ),
              onPanResponderRelease: (e, gestureState) => {
                pan.flattenOffset();
                afertMove(readMove(gestureState), index)

                colorSelected.setValue(8)
                colorSelectedHidde.setValue(0)
              }
            })
        ).current;
        return panResponder
    }

    const readMove = (gestureState) => {
        pan.setValue({
            x: -100,
            y: -100
        });
        pan2.setValue({
            x: -100,
            y: -100
        });
        if( gestureState.dx > (layoutInfos.current.width * 0.6) && gestureState.dy < (layoutInfos.current.width * 0.5) && gestureState.dy > (layoutInfos.current.width * -0.5)){
            return "right"
        }
        if( gestureState.dx < (layoutInfos.current.width * -0.6) && gestureState.dy < (layoutInfos.current.width * 0.5) && gestureState.dy > (layoutInfos.current.width * -0.5)){
            return "left"
        }
        if( gestureState.dy > (layoutInfos.current.height * 0.6) && gestureState.dx < (layoutInfos.current.height * 0.5) && gestureState.dx > (layoutInfos.current.height * -0.5)){
            return "down"
        }
        if( gestureState.dy < (layoutInfos.current.height * -0.6) && gestureState.dx < (layoutInfos.current.height * 0.5) && gestureState.dx > (layoutInfos.current.height * -0.5)){
            return "up"
        }
    }

    const afertMove = (dir, index) => {
        switch (dir) {
            case "up":
                    if ((index - 3) >= 0 && !cubeTable[index - 3]){
                        moveTable(index, index - 3)
                    }
                break;
            
            case "down":
                    if ((index + 3) < cubeTable.length && !cubeTable[index + 3]){
                        moveTable(index, index + 3)
                    }
                break;

            case "right":
                if ((index + 1) < cubeTable.length && index !== 2  && index !== 5 && !cubeTable[index + 1]){
                    moveTable(index, index + 1)
                }
                break;

            case "left":
                if ((index - 1) >= 0 && index !== 3  && index !== 6 && !cubeTable[index - 1]){
                    moveTable(index, index - 1)
                }

            default:
                break;
        }
    }

    const moveTable = (indexIn, indexOut) =>{
        let newTable = [...cubeTable]
        let save = cubeTable[indexIn]

        newTable[indexIn] = undefined
        newTable[indexOut] = save

        setcubeTable(newTable)
        updateScore(0)

    }

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
    
    // display table
    const DisplayTable = () => {

        // interpolate aniated
        const boxInterpolation =  colorSelected.interpolate({
            inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            outputRange:["#ff0000" , "#ff0000", "#00c210", "#0927ae","#0927ae","#0927ae","#b86e00", "#ad0bd5", "#ffffff00"]
        })
        const boxInterpolationHidde =  colorSelectedHidde.interpolate({
            inputRange: [0, 1],
            outputRange:["#ffffff00" , "#515ba1"]
        })

        // render function
        return(
            <View style={styles.containerCube}>
                {cubeTable.map((cube, index)=>
                    cube ?
                    <View 
                        style={[styles.cube, {backgroundColor: cube.color}]} 
                        key={index}  
                        onLayout={event => {
                            const positionElement = event.nativeEvent.layout;
                            if (index == 0){
                                layoutInfos.current = positionElement;
                            }
                            layoutTableInfos[index] = positionElement;
                        }}
                        
                         {...panMove(index).panHandlers} 
                    />
                    :
                    <View style={[styles.cube, {backgroundColor: "#ffffff00"}]} key={index}/>
                )}
                <Animated.View
                    style={[ styles.cubeHidde, {backgroundColor: boxInterpolationHidde,top: pan2.y , left: pan2.x} ]}
                />
                <Animated.View
                    style={[ styles.cubeMove, {backgroundColor: boxInterpolation,top: pan.y , left: pan.x} ]}
                />
            </View>
        )
    }

    // display table ref
    const DisplayTableRef = () =>{
        return(
            <View style={styles.refContainer}>
                {refTable.map((item, index) => 
                    item ?
                    <View
                        key={index}
                        style={[styles.refElement, {backgroundColor: item.color}]}
                    />
                    :
                    <View
                        key={index}
                        style={[styles.refElement, {backgroundColor: "#aaaa"}]}
                    />
                )}
            </View>
        )
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
                        <DisplayTableRef/>
                        <BtnReloadRef refUpdate={updateRef} />
                    </View>
                    <SnapSlider snapValue={changeSnap}/>
            </View>
                <View style={styles.containerBody}>
                <DisplayTable/>
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
    //stye ---------
    containerCube:{
        position:'relative',
        width: 315,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cube:{
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    cubeMove:{
        width: 100,
        height: 100,
        position: 'absolute'
    },
    cubeHidde:{
        width: 100,
        height: 100,
        position: 'absolute'
    },
    refContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 100,
        height: 100,
    },
    refElement:{
        width: 30,
        height: 30,
        borderRadius: 30,
    },
})