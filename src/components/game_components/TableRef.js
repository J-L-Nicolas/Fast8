import React from 'react'
import { StyleSheet, View } from 'react-native'

const TableRef = ({table}) => {
    
    return(
        <View style={styles.refContainer}>
            {table.map((item, index) => 
                item ?
                <View
                    key={index}
                    style={[styles.refElement, {backgroundColor: item.color}]}
                />
                :
                <View
                    key={index}
                    style={[styles.refElement, {backgroundColor: "#aaaa"}]}
                />
            )}
        </View>
    )
}

export default TableRef

const styles = StyleSheet.create({
    refContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 100,
        height: 100,
    },
    refElement:{
        width: 30,
        height: 30,
        borderRadius: 30,
    },
})