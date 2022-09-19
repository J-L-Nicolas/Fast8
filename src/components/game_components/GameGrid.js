import React, {useEffect, useRef} from 'react'
import { StyleSheet, View, Animated, PanResponder } from 'react-native'

//data size
const size = {
    width: 100,
    height: 100
}

const GameGrid = ({tableGame, changeTableGame, changeScore}) => {

    //init ref
    const layoutInfos = useRef(size)
    const layoutTableInfos = useRef([]).current
    const pan = useRef(new Animated.ValueXY({x:-100, y:-100})).current;
    const pan2 = useRef(new Animated.ValueXY({x:-100, y:-100})).current;
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
                    colorSelected.setValue(tableGame[index].id)
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
                    if ((index - 3) >= 0 && !tableGame[index - 3]){
                        moveTable(index, index - 3)
                    }
                break;
            
            case "down":
                    if ((index + 3) < tableGame.length && !tableGame[index + 3]){
                        moveTable(index, index + 3)
                    }
                break;

            case "right":
                if ((index + 1) < tableGame.length && index !== 2  && index !== 5 && !tableGame[index + 1]){
                    moveTable(index, index + 1)
                }
                break;

            case "left":
                if ((index - 1) >= 0 && index !== 3  && index !== 6 && !tableGame[index - 1]){
                    moveTable(index, index - 1)
                }

            default:
                break;
        }
    }

    const moveTable = (indexIn, indexOut) =>{
        let newTable = [...tableGame]
        let save = tableGame[indexIn]

        newTable[indexIn] = undefined
        newTable[indexOut] = save

        changeTableGame(newTable)
        changeScore(0)
    }

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
            {tableGame.map((cube, index)=>
                cube ?
                <View 
                    style={[styles.cube, {backgroundColor: cube.color}]} 
                    key={index}  
                    onLayout={event => {
                        const positionElement = event.nativeEvent.layout;
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

export default GameGrid

const styles = StyleSheet.create({
    containerCube:{
        position:'relative',
        width: 315,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cube:{
        width: size.width,
        height: size.height,
        marginBottom: 5,
    },
    cubeHidde:{
        width: size.width,
        height: size.height,
        position: 'absolute',
    },
    cubeMove:{
        width: 100,
        height: 100,
        position: 'absolute'
    },
})