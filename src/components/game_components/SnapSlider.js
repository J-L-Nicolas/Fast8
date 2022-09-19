import React, {useRef} from 'react'
import { StyleSheet, View, Animated } from 'react-native'

const SnapSlider = ({snapValue}) =>{

    //init ref
    const slideSnapBar = useRef(new Animated.Value(0)).current

    // change bar animate
    const changeSnap = (data) =>{
        Animated.timing(slideSnapBar, {
            toValue: data.n,
            duration: 500,
            useNativeDriver: false
        }).start();
        snapValue(data.level)
    }

    // interpolation actions
    const SlideInterpolate =  slideSnapBar.interpolate({
        inputRange: [0, 100],
        outputRange:["0%" , "100%"]
    })
    const middleBottomInterpolate =  slideSnapBar.interpolate({
        inputRange: [0, 50],
        outputRange:["#777" , "#00f"]
    })
    const endBottomInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["#777", "#777" , "#00f"]
    })
    const snapTextStartInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["900", "300" , "300"]
    })
    const snapTextMiddletInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["300", "900" , "300"]
    })
    const snapTextEndInterpolate =  slideSnapBar.interpolate({
        inputRange: [0 ,50, 100],
        outputRange:["300", "300" , "900"]
    })

    return(
        <View style={styles.containerSnap}>
            <View style={styles.containerLines}>
                <View style={styles.snapBacklLine}>
                    <Animated.View style={[styles.snapLine, {width: SlideInterpolate}]} />
                </View>
                <Animated.View style={styles.snapBull} onStartShouldSetResponderCapture={()=> changeSnap({n: 0, level: 2})} />
                <Animated.View style={[styles.snapBull, {backgroundColor: middleBottomInterpolate}]} onStartShouldSetResponderCapture={()=> changeSnap({n: 50, level:4})} />
                <Animated.View style={[styles.snapBull, {backgroundColor: endBottomInterpolate}]} onStartShouldSetResponderCapture={()=> changeSnap({n: 100, level: 7})} />
            </View>
            <View style={styles.snapBoxText}>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextStartInterpolate}]}>Easy</Animated.Text>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextMiddletInterpolate}]}>medium</Animated.Text>
                <Animated.Text style={[styles.snapText, {fontWeight: snapTextEndInterpolate}]}>Hard</Animated.Text>

            </View>
        </View>
    )
}


export default SnapSlider

const styles = StyleSheet.create({
    containerSnap:{
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    snapBull:{
        width: 30,
        height: 30,
        backgroundColor: "#00f",
        borderRadius: 15,
        elevation: 2,
    },
    containerLines:{
        width:"100%",
        position: 'relative',
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"

    },
    snapBacklLine:{
        position:"absolute",
        backgroundColor: "#777",
        width: "100%",
        height: 10,
        transform: [{scaleX: 0.90}]
    },
    snapLine:{
        backgroundColor: "#55f",
        height: "100%",
    },
    snapBoxText:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    snapText:{
        fontWeight: '900',
        color:"#fff",
    },
})