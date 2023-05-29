import React from 'react'
import { Text, View,Image, TouchableOpacity, Alert } from 'react-native';
import { Container,InfoContainer,ContainerDados,PokemonsContainer, NomeTexto } from './style';
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import { getDatabase, ref, set, push, get, remove} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const DeckBox = ({id, name, setRefresh, valuesLink})=>{
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser.uid
    
    const handleDelete = async () => {
        const itemRef = ref(database, `${user}/decks/${valuesLink}`);
        console.log(itemRef)
        await remove(itemRef)
        setRefresh((prevRefresh) => prevRefresh + 1)
        Alert.alert("Removido")
    }
    
  return (
    <Container>
        <ContainerDados>
            <InfoContainer>
                <NomeTexto> {name} </NomeTexto>
            </InfoContainer>
            <PokemonsContainer>
                {
                    id.map((item, index)=>(
                        <Image key={index} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item}.png`}} style={{width:50,height:50}} />
                    ))
                }

            </PokemonsContainer>
        </ContainerDados>
        <TouchableOpacity style={{color:'#fff', alignSelf:'center', marginTop:5}} onPress={()=>handleDelete()}>
            <FontAwesome name="trash" size={20} color="#fff"/>
        </TouchableOpacity>
    </Container>
  )
}

export default DeckBox