import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { getDatabase, ref, set, push, get, remove} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { Container, Lista } from "./style";
import PokemonBox from '../../../components/PokemonsBox'

const PokemonsFavoritos = () => {
    const[db, setDb] = useState({})
    const[banco, setBanco] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser.uid

    useEffect(() =>{
        var values = {};
        var control = false;
        const collectionRef = ref(database, `${user}/pokemons`);
        get(collectionRef).then((result) => {
            values = result.val();
            setDb(values)
            var banco2 = []
            if(values){
                Object.keys(values).forEach((item) => {
                    var typeArray = []
                    const name = values[item].name
                    const id = values[item].id
                    const type = values[item].type
                    typeArray.push(type)
                    const info = {name, id, typeArray}
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
    },[db])

      return(
        <Container>
        {
            isLoading? 
            <ActivityIndicator size='large' color={'blue'} />
            :
            <>
            {
                banco.length == 0?
                <View style={{flex:1,display:'flex', justifyContent:'center' ,textAlign:'center'}}>
                    <Text>Sem favoritos</Text>
                </View>
                :
                <Lista
                contentContainerStyle={{alignItems:'center'}}
                data={banco}
                renderItem={({ item }) => (
                    <PokemonBox  name={item.name} id={item.id} type={item?.typeArray}/>
                    
                )}
            />
            }
            </>
        }
    </Container>
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

export default PokemonsFavoritos;
