import React, {useEffect} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy'

// imp components
import SwictLang from '../components/menu_components/SwictLang'

const Menu = () => {

  // init navigation
  const navigation = useNavigation();
    
    // init store
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];
    
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
        <TouchableOpacity style={styles.itemMenu}>
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
const styles = StyleSheet.create({
  container:{
    flex: 1,
      alignItems: "center",
      backgroundColor: "#515ba1",
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
    backgroundColor: "#515ba1",
    borderWidth: 10,
    borderBottomWidth: 0,
    borderTopEndRadius: 55,
    borderTopStartRadius: 55,
    borderColor: "#373e6d",
    marginTop: 40,
  },
  itemMenuG:{
    width: "80%",
    height:70,
    backgroundColor: "#36a2d5",
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
    backgroundColor: "#383e6e",
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
})