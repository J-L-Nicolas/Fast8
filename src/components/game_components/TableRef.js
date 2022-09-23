import React from 'react'
import { StyleSheet, View } from 'react-native'
import {useStoreState} from 'easy-peasy'

const TableRef = ({table}) => {

    // init store
    const getColors = useStoreState((state) => state.getColors);

    //styles
    const styles = StyleSheet.create(dataStyle(getColors))
    
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
                    style={styles.refElement}
                />
            )}
        </View>
    )
}

export default TableRef

const dataStyle = (getcolor) => {

    return {
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
            backgroundColor: getcolor.backTertiary
        },
    }
}