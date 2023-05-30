import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import PokemonBox from "../../../components/PokemonsBox";
import api from "../../services/api";
import { Container, Lista } from './style'

const Search = ({navigation}) => {
    const[text, setText] = useState('')
    const[pokemons, setPokemons] = useState([])

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get('/pokemon?limit=40&offset=0')
            const { results } = response.data

            const loadPokemons = await Promise.all(
                results.map(async (pokemon) => {
                    const {id, types} = await getMoreInfo(pokemon.url)
                    
                    return{
                        name:pokemon.name,
                        id,
                        types
                    }

                })
            )
            setPokemons(loadPokemons)
        }

        getAllPokemons()
    },[])

    async function getMoreInfo(url){
        const response = await api.get(url)
        const {id, types} = response.data

        return{
            id, types
        }
    }
    console.log(text.toLowerCase())
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss
        }}>
            <Container>
                <TextInput style = {styles.input}
                placeholder="Pesquise um pokemon"
                onChangeText={(v) => setText(v)}
                />
                <Lista
                    contentContainerStyle={{alignItems:'center'}}
                    keyExtractor={(pokemon)=> pokemon.id}
                    data={text === '' ? pokemons : pokemons.filter((pokemon) => (pokemon.name.toLowerCase().includes(text.toLowerCase())))}
                    renderItem={({ item }) => (
                        <PokemonBox name={item.name} id={item?.id} type={item?.types} navigation={navigation} />
                    )}
                />
            </Container>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input:{
        padding:10,
        borderRadius:12,
        width:340,
        backgroundColor:'#fff',
        marginTop: 15,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
})

export default Search;