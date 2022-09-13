import React from 'react'
import { View, Text, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useStoreState, useStoreActions} from 'easy-peasy'

const Home = () => {
    
    // init navigation
    const navigation = useNavigation();

    // init store
    const count = useStoreState((state) => state.count);
    const plusCount = useStoreActions((actions) => actions.plusCount);

  return (
    <View>
      <Text>Home</Text>
      <Text>value: {count}</Text>
      <Button
        title='Next view'
        onPress={()=>{navigation.navigate('Menu')}}
      />
      <Button
        title='Incre'
        onPress={plusCount}
      />
    </View>
  )
}

export default Home