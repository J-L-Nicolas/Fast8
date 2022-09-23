import React from 'react'
import { StyleSheet, Text, TouchableOpacity , Image, View} from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy'

const SwictLang = () => {

    // init store
    const IdLang = useStoreState((state) => state.langues);
    const toggleLang = useStoreActions((actions) => actions.toggleLang);

  return (
    <TouchableOpacity onPress={toggleLang}>
        <Text>{IdLang == "en" ?  "Français" : "English" }</Text>
        <View style={styles.boxStyle}>
          <Image
            source={require("../../assets/img/flag_fr.png")}
            style={styles.ImageFlag1}
          />
          <Image
            source={require("../../assets/img/flag_en.png")}
            style={styles.ImageFlag2}
          />
        </View>
    </TouchableOpacity>
  )
}

export default SwictLang

//Style
const styles = StyleSheet.create({
  boxStyle:{
    position:"relative",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: "row",
  },
  ImageFlag1:{
    position: 'absolute',
    width: 65,
    height: 50,
    resizeMode: 'cover',
    transform:  [{ translateX: 30 }, {translateY: 20}],
    elevation: 2,
    zIndex: 5,
  },
  ImageFlag2:{
    position: 'absolute',
    width: 65,
    height: 50,
    resizeMode: 'cover',
    elevation: 1,
    zIndex: 1,
  }
})