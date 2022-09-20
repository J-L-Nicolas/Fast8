import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy'

const SwictLang = () => {

    // init store
    const IdLang = useStoreState((state) => state.langues);
    const toggleLang = useStoreActions((actions) => actions.toggleLang);

  return (
    <TouchableOpacity onPress={toggleLang}>
        <Text>{IdLang == "en" ?  "Francais" : "English" }</Text>
    </TouchableOpacity>
  )
}

export default SwictLang

//Style
const styles = StyleSheet.create({

})