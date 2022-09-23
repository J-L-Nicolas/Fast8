import React, {useRef, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity , Image, View, Animated} from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy'

const SwictLang = () => {

  // init store
  const IdLang = useStoreState((state) => state.langues);
  const toggleLang = useStoreActions((actions) => actions.toggleLang);

  const wathLang = () => (IdLang === "fr") ? 0 : 1 

  // init ref
  const flagAnim = useRef(new Animated.Value(wathLang())).current

  // interpolation actions
  const flag1Anim =  flagAnim.interpolate({
    inputRange: [0, 1],
    outputRange:[0 , 18]
  })
  const flag1AnimZ =  flagAnim.interpolate({
    inputRange: [0, 1],
    outputRange:[2 , 1]
  })
  const flag2Anim =  flagAnim.interpolate({
    inputRange: [0, 1],
    outputRange:[18 , 0]
  })
  const flag2AnimZ =  flagAnim.interpolate({
    inputRange: [0, 1],
    outputRange:[1, 2]
  })

  const pressed = () =>{
    toggleLang()
  }

  useEffect(() => {
    Animated.timing(flagAnim, {
      toValue: wathLang(),
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [IdLang])
    
  return (
    <TouchableOpacity onPress={pressed}>
        <View style={styles.boxStyle}>
          <Animated.Image
            source={require("../../assets/img/flag_fr.png")}
            style={[styles.ImageFlag1, {transform:  [{ translateX: flag1Anim }, {translateY: flag1Anim}], zIndex: flag1AnimZ}]}
          />
          <Animated.Image
            source={require("../../assets/img/flag_en.png")}
            style={[styles.ImageFlag2, {transform:  [{ translateX: flag2Anim }, {translateY: flag2Anim}], zIndex: flag2AnimZ}]}
          />
        </View>
    </TouchableOpacity>
  )
}

export default SwictLang

//Style
const styles = StyleSheet.create({
  boxStyle:{
    width: 58,
    height: 48,
    position:"relative",
    flexDirection: "row",
  },
  ImageFlag1:{
    position: 'absolute',
    width: 35,
    height: 30,
    resizeMode: 'cover',
    elevation: 2,
  },
  ImageFlag2:{
    position: 'absolute',
    width: 35,
    height: 30,
    resizeMode: 'cover',
    elevation: 1,
  }
})