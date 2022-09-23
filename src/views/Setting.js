import React, {useState} from 'react'
import { StyleSheet, View, Text, Appearance } from 'react-native'
import {useStoreActions, useStoreState} from 'easy-peasy'
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsColorMode = [
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Light',
        value: 'light'
    }, 
    {
        id: '2',
        label: 'Dark',
        value: 'dark'
    },
    {
        id: '3',
        label: 'System Mode',
        value: 'system',
        selected : true
    },
]

const Setting = () => {

    // init store
    const getColors = useStoreState((state) => state.getColors);
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];
    const changeColorsMode = useStoreActions((action) => action.changeColorsMode)
    const changesystemColor = useStoreActions((action) => action.changeSystemColor)

    //styles
    const styles = StyleSheet.create(dataStyle(getColors))

    //init state
    const [radioButtonsColors, setRadioButtonsColors] = useState(radioButtonsColorMode)

    function onChangeColorMode(radioButtonsArray) {
        const value = radioButtonsArray.find((el)=> el.selected == true).value
        if(value === "system"){
            changesystemColor(true)
            changeColorsMode({color: Appearance.getColorScheme(), type: 1})
        }else{
            changesystemColor(false)
            changeColorsMode({color: value, type: 1})
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.boxTitle}>
            <Text style={styles.title}>Setting</Text>
        </View>
        <View style={styles.boxParam}>
            <Text style={styles.titleParam}>Choose a theme Color: </Text>
            <RadioGroup 
                radioButtons={radioButtonsColors} 
                onPress={onChangeColorMode} 
                containerStyle={styles.radio}
            />
        </View>
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
      boxTitle:{
        height: 70,
        backgroundColor: getcolor.secondary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: "center",
        justifyContent: "center",
      },
      title:{
        fontSize: 30,
        fontWeight: 'bold',
      },
      boxParam:{
        width: "100%",
        marginTop: 20,
        borderTopWidth: 5,
        borderColor: "#8884",
        alignItems: "center",
      },
      titleParam:{
        fontSize: 20,
        fontWeight: 'bold',
      },
      radio:{
    
      }
    }
}