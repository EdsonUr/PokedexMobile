import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DeckBox from "../../../components/DeckBox";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { getDatabase, ref, get} from 'firebase/database';
import {getAuth} from 'firebase/auth'

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
                    var infos = []
                    const valuesLink = item 
                    const name = values[item].name
                    Object.keys(values[item].id).forEach((pok) =>{
                        const namePok = values[item].id[pok].namePokemon
                        const id = values[item].id[pok].id
                        const types = values[item].id[pok].types
                        const info2 = {namePok,id, types}
                        infos.push(info2)
                    })
                    const info = {name, infos, valuesLink}
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
    },[refresh])
    console.log(banco)
     return(
        <View style={styles.container}>
            {
                isLoading?
                null
                :
                banco.length == 0?
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text> Sem deck </Text>
                </View>
                :
                <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                    {
                        banco.map((item, index)=>(
                            <DeckBox key={index} name={item.name} infos={item.infos} valuesLink={item.valuesLink} setRefresh={setRefresh}/>
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
