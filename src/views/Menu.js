import React from 'react'
import { View, Text } from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy'

const Menu = () => {
    
    // init store
    const count = useStoreState((state) => state.count);

  return (
    <View>
      <Text>Menu</Text>
      <Text>Value page Home: {count}</Text>
    </View>
  )
}

export default Menu