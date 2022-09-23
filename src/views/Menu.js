import React, {useEffect} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreActions, useStoreState} from 'easy-peasy'

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

    //styles
    const styles = StyleSheet.create(dataStyle(getColors))
    
    // go game view
    const goGame=()=>{
      navigation.navigate("Game")
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
        <TouchableOpacity style={styles.itemMenu}>
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