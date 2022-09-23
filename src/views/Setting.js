import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {useStoreActions, useStoreState} from 'easy-peasy'

const Setting = () => {

    // init store
    const getColors = useStoreState((state) => state.getColors);
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];
    const changeColorsMode = useStoreActions((action) => action.changeColorsMode)

    //styles
    const styles = StyleSheet.create(dataStyle(getColors))

    return (
        <View style={styles.container}>
        <Text>Setting</Text>
        </View>
    )
}

export default Setting

//Style
const dataStyle = (getcolor) => {

    return {
      container:{
        flex: 1,
        backgroundColor: getcolor.primary,
      },
    }
}