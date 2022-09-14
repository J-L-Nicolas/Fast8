import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Text, PanResponder, Animated, Systrace } from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy'
import PlayManager from '../components/PlayManager'

const Game = () => {

    // init store
    const tableCubes = useStoreState((state) => state.tableCubes);
    
    //init state 
    const [cubeTable, setcubeTable] = useState(tableCubes)
    const [refTable, setrefTable] = useState(PlayManager.generateTabAlt(4, cubeTable))

    //init ref
    const layoutInfos = useRef(null)
    const layoutTableInfos = useRef([]).current
    const pan = useRef(new Animated.ValueXY()).current;
    const pan2 = useRef(new Animated.ValueXY()).current;
    const colorSelected = useRef(new Animated.Value(8)).current
    const colorSelectedHidde = useRef(new Animated.Value(0)).current

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
    }

    // init effect
    useEffect(() => {
      const result = PlayManager.comparTabs(cubeTable, refTable, "idColor")
      if (result) {
        setrefTable(PlayManager.generateTabAlt(3+PlayManager.getRandomInt(4), cubeTable))
      }
    }, [cubeTable])
    

    // display table
    const DisplayTable = () => {

        // interpolate aniated
        const boxInterpolation =  colorSelected.interpolate({
            inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            outputRange:["#ff0000" , "#ff0000", "#00c210", "#0927ae","#0927ae","#0927ae","#e7eb00", "#ad0bd5", "#ffffff00"]
        })
        const boxInterpolationHidde =  colorSelectedHidde.interpolate({
            inputRange: [0, 1],
            outputRange:["#ffffff00" , "#ffffff96"]
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
                    <View style={[styles.cube, {backgroundColor: "#ffffff11"}]} key={index}/>
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
                        style={[styles.refElement, {backgroundColor: "#ccc"}]}
                    />
                )}
            </View>
        )
    }
    
    // Render
    return (
        <View style={styles.container}>
            <Text>Game</Text>
            <DisplayTableRef/>
            <DisplayTable/>
        </View>
    )

}

export default Game

//Style
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center"
    },
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
    }
})