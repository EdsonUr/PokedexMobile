import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import RandomBox from "../../../components/RandomBox";
import { getDatabase, ref, push} from 'firebase/database';
import {getAuth} from 'firebase/auth'
import DialogInput from 'react-native-dialog-input';

const Home = () => {
    const[text, setText] = useState('')
    const[pokemons, setPokemons] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[pokemonsAleatorios, setPokemonsAleatorios] = useState([]);
    const[generated, setGenerated] = useState(false)
    const [visible, setVisible] = React.useState(false);
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser.uid

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
            setIsLoading(false)
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

    const handleRandom = () =>{
        var aleatorio = []
        var indices = []
        var control = true
        for(let i =0; i < 6; i++){
            control = true
            while(control){
                var index = Math.floor(Math.random()*pokemons.length);
                if(indices.includes(index)){
                    null
                }else{
                    indices.push(index)
                    aleatorio.push(pokemons[index])
                    control = false
                }
            }
        }
        setPokemonsAleatorios(aleatorio)
        setGenerated(true)
    }
    return(
        <SafeAreaView style={styles.container}>
            {
                isLoading?
                <ActivityIndicator size={'small'} color={'blue'} />
                :
                <>
                <TouchableOpacity style={styles.botao} onPress={() => handleRandom()}  >
                    <Text style={styles.textoBotao}>Gerar</Text>
                </TouchableOpacity>
                {
                    generated?
                    <>
                    <FlatList
                        contentContainerStyle={{alignItems:'center', justifyContent:'center'}}
                        keyExtractor={(pokemon) => pokemon.id}
                        ItemSeparatorComponent={() => <View style={{height: 35}} />}
                        data={pokemonsAleatorios}
                        renderItem={({item}) =>(
                            <RandomBox name={item.name} id={item.id} type={item.types} />
                        )}
                        numColumns={2}
                        style={styles.lista}
                    />
                    <TouchableOpacity style={styles.botao2} onPress={ () => { 
                    setVisible(true)
                    }}>
                        <DialogInput
                            isDialogVisible={visible}
                            title={"Deck Name"}
                            message={"Nome deck:"}
                            hintInput ={"Digite..."}
                            submitInput={ (inputText) => {
                                const collectionRef = ref(database, `${user}/decks`);
                                    var ids = []
                                    pokemonsAleatorios.forEach((item) =>{
                                        const namePokemon = item.name;  
                                        const id = item.id;  
                                        const types = item.types;  
                                        const infos = {namePokemon, id, types}
                                        ids.push(infos)
                                    })
                                    console.log(ids)
                                    push(collectionRef, {
                                        name: inputText,
                                        id: ids,
                                    });
                                setVisible(false);
                            }}
                            closeDialog={() => setVisible(false)}>  
                        </DialogInput>
                        <Text style={styles.textoBotao}>Salvar</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <>
                    <View>
                        <View style={{flexDirection:'row', marginBottom:35}}>
                            <RandomBox name={null} id={null} type={null}/>
                            <RandomBox name={null} id={null} type={null}/>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:35}}>
                            <RandomBox name={null} id={null} type={null}/>
                            <RandomBox name={null} id={null} type={null}/>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:35}}>
                            <RandomBox name={null} id={null} type={null}/>
                            <RandomBox name={null} id={null} type={null}/>
                        </View>
                    </View>      
                        <View style={styles.inv}>
                    </View> 
                    </>
                }
                </>
            }
        </SafeAreaView>
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
    },
    botao:{
        marginTop:20,
        marginBottom:40, 
        backgroundColor:'#1F3955',
        width:190,
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:38,
    },
    lista:{
        width:'100%',
    },  
    textoBotao:{
        color:'white',
        fontWeight:'900',
        fontSize:18
    },
    botao2:{
        marginTop:20,
        marginBottom:40, 
        backgroundColor:'#1F3955',
        width:190,
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:38,
    },
    inv:{
        marginTop:20,
        marginBottom:40, 
        width:190,
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:38,
    }
})

export default Home;
