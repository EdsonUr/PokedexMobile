import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, ActivityIndicator} from 'react-native';
import PokemonBox from "../../../components/PokemonsBox";
import api from "../../services/api";
import { Container, Lista } from './style'

const Search = ({navigation}) => {
    const[text, setText] = useState('')
    const[pokemons, setPokemons] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[footerLoading, setFooterLoading] = useState(true)
    const[numPokemons, setNumPokemons] = useState(40)
    const[getMore, setGetMore] = useState(false)

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get(`/pokemon?limit=${numPokemons}&offset=0`)
            const { results } = response.data
            console.log("UseEffect : " + results.length)
            setFooterLoading(true)

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
            setPokemons([...pokemons, ...loadPokemons])
            setIsLoading(false)
            setFooterLoading(false)
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

    const handleGetMore = async() =>{
        console.log(getMore)
        setGetMore(true)
        if(!getMore){
            const response = await api.get(`/pokemon?limit=${numPokemons - numPokemons*1/2}&offset=${numPokemons}`)
            const { results } = response.data
            console.log(results.length)
            setFooterLoading(true)
    
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
            setPokemons([...pokemons, ...loadPokemons])
            setNumPokemons((prevNumPokemons) => prevNumPokemons + prevNumPokemons*1/2)
            setGetMore(false)
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss
        }}>
            {
                isLoading?
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size={'small'} color={'blue'}/>
                </View>
                :
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
                        ListFooterComponent={
                            footerLoading?
                            <View style={{marginTop:10}}>
                                <ActivityIndicator size={'small'} color={'blue'} />
                            </View>
                            :
                            null
                        }
                        onEndReachedThreshold={0.01}
                        onEndReached={() => { handleGetMore()}}
                    />
                </Container>
            }
            
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