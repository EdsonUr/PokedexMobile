import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Pagina Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold'
    }
})

export default Home;
