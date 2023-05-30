import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, TouchableOpacity, Alert } from 'react-native';
import { Container,InfoContainer,ContainerDados,PokemonsContainer, NomeTexto } from './style';
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import { getDatabase, ref, remove} from 'firebase/database';
import {getAuth} from 'firebase/auth'

const DeckBox = ({infos, name, setRefresh, valuesLink})=>{
    const navigation = useNavigation()
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
                    infos.map((item, index)=>(
                        <TouchableOpacity key={index} onPress={()=>navigation.navigate('PokemonInfo', {name:item.namePok, id:item.id, type:item.types})}>
                            <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}} style={{width:50,height:50}} />
                        </TouchableOpacity>
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