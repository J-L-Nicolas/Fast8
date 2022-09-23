import React, {useState} from 'react'
import { StyleSheet, View, Text, Appearance, Switch } from 'react-native'
import {useStoreActions, useStoreState} from 'easy-peasy'
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsColorMode = [
    {
        id: '1',
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
    const vibration = useStoreState((state) => state.vibration);
    const setVibration = useStoreActions((action) => action.setVibration)
    const sound = useStoreState((state) => state.vibration);
    const setSound = useStoreActions((action) => action.setVibration)
    
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
            <Text style={styles.title}>{lang.settingTitle}</Text>
        </View>
        <View style={styles.boxParam}>
            <Text style={styles.titleParam}>{lang.selectTheme}: </Text>
            <RadioGroup 
                radioButtons={radioButtonsColors} 
                onPress={onChangeColorMode} 
                labelStyle={styles.radio}
            />
        </View>
        <View style={styles.boxParam}>
            <Text style={styles.titleParam}>{lang.vibrasionSelect}: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={vibration ? styles.btnActive : styles.secondary}
                onValueChange={setVibration}
                value={vibration}
            />
        </View>
        <View style={styles.boxParam}>
            <Text style={styles.titleParam}>{lang.audioSelet}: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={sound ? styles.btnActive : styles.secondary}
                onValueChange={setSound}
                value={sound}
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
        color: getcolor.primaryFont
      },
      boxParam:{
        width: "100%",
        marginTop: 20,
        borderTopWidth: 5,
        borderColor: "#8884",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      },
      titleParam:{
        color: getcolor.secondaryFont,
        fontSize: 20,
        fontWeight: 'bold',
      },
      radio:{
        color: getcolor.secondaryFont,
      }
    }
}