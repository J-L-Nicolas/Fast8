import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, BackHandler, AppState} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {useStoreActions, useStoreState} from 'easy-peasy'
import Sound  from 'react-native-sound'

// imp components
import SwictLang from '../components/menu_components/SwictLang'

const Menu = () => {
    // init navigation
    const navigation = useNavigation();
    
    // init store
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];
    const getColors = useStoreState((state) => state.getColors);
    const changeColorsMode = useStoreActions((action) => action.changeColorsMode)
    const getsound = useStoreState((state) => state.sound);
    const setMidi = useStoreActions((action) => action.setMidi)

    //state
    const [appEtat, setappEtat] = useState(null)

    //ref
    const soundMidi = useRef(null)

    //effect
    useEffect(() => {
      // init sound
      let whoosh = new Sound('back_music.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      
        // Play the sound sens store
        whoosh.play();
        whoosh.setVolume(0.5)
        whoosh.setNumberOfLoops(-1)
        soundMidi.current = whoosh
        setMidi(whoosh)
      });
    }, [])

    useEffect(() => {
      const subscription = AppState.addEventListener("change", nextAppState => {
        setappEtat(nextAppState)
      });
  
      return () => {
        subscription.remove();
      };
    }, []);

    useEffect(() => {
      if (getsound && appEtat === "background"){
        soundMidi.current.pause()
      }
      if (getsound && appEtat === "active"){
        console.log("open", getsound)
        soundMidi.current.play()
      }
    }, [appEtat])
    
    //styles
    const styles = StyleSheet.create(dataStyle(getColors))
    
    // go game view
    const goGame=()=>{
      navigation.navigate("Game")
    }

    // go Setting view
    const goSetting=()=>{
      navigation.navigate("Setting")
    }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/title_0.png")}
        style={styles.imageTitle}
      />
      <View style={styles.containerMenu}>
        <TouchableOpacity 
            style={styles.itemMenuG}
            onPress={goGame}
          >
          <Text style={styles.itemMenuTitle}>{lang.btn1}</Text>
          <Image
            source={require("../assets/img/icon_play.png")}
            style={{width: 14, height: 14, marginLeft: 10, marginTop: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu} onPress={goSetting}>
          <Text style={styles.itemMenuTitle}>{lang.btn2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu} onPress={()=> changeColorsMode("light")}>
          <Text style={styles.itemMenuTitle}>{lang.btn3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu} onPress={()=>BackHandler.exitApp()}>
          <Text style={styles.itemMenuTitle}>{lang.btn4}</Text>
        </TouchableOpacity>
        <SwictLang />
        <Image
          source={require("../assets/img/bottom_0.png")}
          style={{width: "100%"}}
        />
      </View>
    </View>
  )
}

export default Menu

//Style
const dataStyle = (getcolor) => {

  return {
    container:{
      flex: 1,
        alignItems: "center",
        backgroundColor: getcolor.primary,
        paddingTop: 40,
    },
    imageTitle:{
      resizeMode: "contain",
      width: "90%", 
      height: 100,
    },
    containerMenu:{
      flex: 1,
      alignItems:'center',
      width:"100%",
      backgroundColor: getcolor.primary,
      borderWidth: 10,
      borderBottomWidth: 0,
      borderTopEndRadius: 55,
      borderTopStartRadius: 55,
      borderColor: getcolor.secondary,
      marginTop: 40,
    },
    itemMenuG:{
      width: "80%",
      height:70,
      backgroundColor: getcolor.btnActive,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 20,
      elevation: 5,
      marginVertical: 40,
    },
    itemMenu:{
      width: "80%",
      height:70,
      backgroundColor: getcolor.secondary,
      justifyContent: 'center',
      borderRadius: 20,
      elevation: 5,
      marginVertical: 10,
    },
    itemMenuTitle:{
      textAlign: 'center',
      color: "#ffffff",
      fontSize: 20,
      fontWeight: 'bold',
    }
  }
}