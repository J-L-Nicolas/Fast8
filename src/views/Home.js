import React from 'react'
import { View, Text, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Next view'
        onPress={()=>{navigation.navigate('Menu')}}
      />
    </View>
  )
}

export default Home