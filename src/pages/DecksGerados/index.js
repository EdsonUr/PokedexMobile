import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DeckBox from "../../../components/DeckBox";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { getDatabase, ref, set, push, get, remove} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const DecksGerados = () => {
    const[db, setDb] = useState({})
    const[banco, setBanco] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[refresh, setRefresh] = useState(0)
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser.uid

    useEffect(() =>{
        var values = {};
        var control = false;
        const collectionRef = ref(database, `${user}/decks`);
        get(collectionRef).then((result) => {
            values = result.val();
            setDb(values)
            var banco2 = []
            if(values){
                Object.keys(values).forEach((item) => {
                    const valuesLink = item 
                    const name = values[item].name
                    const id = values[item].id
                    const info = {name, id, valuesLink}
                    banco2.push(info)
                })
                setBanco(banco2) 
                control = true;
            }
            if(!control){
                setBanco([])
            }
        })
        setIsLoading(false)
        console.log("Entrou useEffect")
    },[refresh])
     return(
        <View style={styles.container}>
            {
                isLoading?
                null
                :
                banco.length == 0?
                <Text> Sem deck </Text>
                :
                <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                    {
                        banco.map((item, index)=>(
                            <DeckBox key={index} name={item.name} id={item.id} valuesLink={item.valuesLink} setRefresh={setRefresh}/>
                        ))
                    }
                </ScrollView>
                
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:20,
    },
    text:{
        fontSize:25,
        fontWeight:'bold'
    }
})

export default DecksGerados;
