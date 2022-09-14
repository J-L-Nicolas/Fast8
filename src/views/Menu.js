import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy'

const Menu = () => {

  // init navigation
  const navigation = useNavigation();
    
    // init store
    const count = useStoreState((state) => state.count);

    // go game view
    const goGame=()=>{
      navigation.navigate("Game")
    }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/title_0.png")}
        style={{width: "100%", height: 100}}
      />
      <View style={styles.containerMenu}>
        <TouchableOpacity 
            style={styles.itemMenuG}
            onPress={goGame}
          >
          <Text style={styles.itemMenuTitle}>Play</Text>
          <Image
            source={require("../assets/img/icon_play.png")}
            style={{width: 14, height: 14, marginLeft: 10, marginTop: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.itemMenuTitle}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.itemMenuTitle}>More Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenu} onPress={()=>BackHandler.exitApp()}>
          <Text style={styles.itemMenuTitle}>Exit</Text>
        </TouchableOpacity>
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
    width: "100%", 
    height: 100,
  },
  containerMenu:{
    flex: 1,
    alignItems:'center',
    width:"100%",
    backgroundColor: "#515ba1"
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