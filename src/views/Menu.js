import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy'

const Menu = () => {

  // init navigation
  const navigation = useNavigation();
    
    // init store
    const count = useStoreState((state) => state.count);

  return (
    <View>
      <Text>Menu</Text>
      <Text>Value page Home: {count}</Text>
      <Button
        title='Go Game'
        onPress={()=>{navigation.navigate("Game")}}
      />
    </View>
  )
}

export default Menu