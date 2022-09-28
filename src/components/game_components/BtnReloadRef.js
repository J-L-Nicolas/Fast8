import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

const BtnReloadRef = ({refUpdate}) =>{

    return(
        <TouchableOpacity 
            onPress={refUpdate}
            style={styles.btnReloadRef}
        >
            <Image style={styles.imgReloadIcon}
                source={require("../../assets/img/reload_icon.png")}
            />
        </TouchableOpacity>
    )
}

export default BtnReloadRef

//Style
const styles = StyleSheet.create({
    btnReloadRef: {
        height: 60,
        padding: 10,
        backgroundColor: "#ffffffc2",
        borderRadius: 40,
    },
    imgReloadIcon: {
        resizeMode: "contain",
        width: 40,
        height: 40,
    }
})