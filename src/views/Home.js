import React from 'react'
import { View, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy'

const Home = () => {
    
    // init navigation
    const navigation = useNavigation();

    // got next page
    const nextPage = () =>{
      setTimeout(()=>{
        // navigation.navigate('Menu')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Menu' }]
        })
      },2000)
    }
    nextPage()

  return (
    <View style={{flex: 1}}>
      <Image
        source={require("../assets/img/loading.gif")}
        style={{width: "100%", resizeMode: 'cover', height:"100%"}}
      />
    </View>

  )
}

export default Home