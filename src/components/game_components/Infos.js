import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {useStoreState} from 'easy-peasy'

const Infos = ({infos}) => {

    // init store
    const IdLang = useStoreState((state) => state.langues);
    const lang = useStoreState((state) => state.stringLang)[IdLang];

    return(
        <View style={styles.boxInfos}>
            <View style={styles.inBoxInfos}>
                <Text style={styles.textInfos}>{lang.scoreText}: {infos.score}</Text>
                <Text style={styles.textInfos}>{lang.movesText}: {infos.move}</Text>
            </View>
            <View style={styles.oldList}>
                {infos.oldMoves.length > 0 && <Text style={styles.titleOldList}>{lang.textOLMove}:</Text>}
                {infos.oldMoves.map((move, index)=>
                    <Text key={index}>➜ {move} - {move < 10 ? "★★★" : move < 20 ? "★★" : "★" } </Text>
                )}
            </View>
        </View>
    )
}

export default Infos

const styles = StyleSheet.create({
    boxInfos:{
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    inBoxInfos:{
        flexDirection: 'row',  
        justifyContent:'space-between'  
    },
    textInfos:{
        color: "#fff",
        fontSize: 20,
    },
    oldList:{
        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: 7,
        padding: 5,
    },
    titleOldList:{
        color: "#777",
        fontWeight:  'bold',
        fontSize: 15,
        textAlign: 'center',
    }
})