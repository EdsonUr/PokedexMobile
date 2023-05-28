import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image,ScrollView, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from "react-native";
import boxType from "../../GlobalStyles/boxType";
import backgroundType from '../../GlobalStyles/index'
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import api from "../../services/api";
import * as Progress from 'react-native-progress';
import PokemonEvolutionBox from "../../../components/PokemonEvolutionBox";
import { Lista, TextId, TextNome, ContainerPokemonInfo, BotaoAtivo, BotaoInativo, TelaInfo, TextIntroduction, OptionTitle, AttributesText } from "./style";
import { Alert } from "react-native";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { getDatabase, ref, set, push, get, remove} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { Platform } from "react-native";


const PokemonInfo = () => {
    const route = useRoute()
    const {name, id, type} = route.params
    const navigation = useNavigation()
    const [activeScreen, setActiveScreen] = useState('about')
    const[pokemon,setPokemon] = useState({})
    const[introduction, setIntroduction] = useState("");
    const[evolutionChain, setEvolutionChain] = useState({})
    const[evolutions, setEvolutions] = useState([])
    const[isLoadingAbout, setIsLoadingAbout] = useState(true)
    const[isLoadingEvolution, setIsLoadingEvolution] = useState(true)
    const[isLoadingStats, setIsLoadingStats] = useState(true)
    const[control, setControl] = useState(false)
    const[inBase, setInBase] = useState(false)
    const[db, setDb] = useState({})
    const[corStar, setCorStar] = useState('white')
    const[itemPokemon, setItemPokemon] = useState()
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser.uid
    
    useEffect(() =>{
        async function getPokemonDetail(){
            try{
                const response = await api.get(`/pokemon/${id}`)
                const {stats,abilities,height,weight} = response.data
                setPokemon({
                    stats,
                    abilities,
                    height,
                    weight,
                })
                setIsLoadingStats(false)
            }catch(err){

            }
        }
        async function getOtherDetails(){
            try{
                const response = await api.get(`/pokemon-species/${name}`)
                const {flavor_text_entries} = response.data
                setIntroduction(flavor_text_entries[6].flavor_text)
                setIsLoadingAbout(false)
            }catch(err){

            }
        }
        async function getEvolutionChain(){
            try{
                const response = await api.get(`/pokemon-species/${name}`)
                const {evolution_chain} = response.data
                const response2 = await api.get(evolution_chain.url)
                const {chain} = response2.data
                setEvolutionChain(chain)

                function getEvolutions(pokemon) {
                    if(!control){
                        const name = pokemon.species.name;
                        const level = pokemon.evolution_details[0]?.min_level || 0;
                        const idImage = pokemon.species.url.substr(42).replaceAll("/","");
                        const evolution = { name, level, idImage };
                        setEvolutions((evolutions) => [...evolutions, evolution]);
                        if (pokemon.evolves_to.length > 0) {
                        pokemon.evolves_to.forEach((evolution) => getEvolutions(evolution));
                        }
                    }
                  }
                  getEvolutions(chain)
                  setIsLoadingEvolution(false)
                  setControl(true)

            }catch(err){
            }
        }
        getOtherDetails()
        getPokemonDetail()
        getEvolutionChain()
        getData()
    }, [])

    async function getData(){
        var values = {};
        const collectionRef = ref(database, `${user}/pokemons`);
        await get(collectionRef).then((result) => {
            values = result.val();
            setDb(values)
        })
    }
    
    useEffect(() =>{
        if(db){
            Object.keys(db).forEach((item) => {
                if(db[item].id === id){
                    console.log("entrou")
                    setCorStar('yellow')
                    setInBase(true)
                    setItemPokemon(item)
                }
            })
        } 
    },[db])
   
    return(
        <View style={{flex:1,backgroundColor:boxType[type[0].type.name]}}>
            <View style={styles.container}>
                <View style={{width:300,flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:20}}> 
                        <FontAwesome name="arrow-left" size={24} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:20}} onPress={async () => {
                        const collectionRef = ref(database, `${user}/pokemons`);
                        console.log(inBase)
                        if(inBase){
                            const itemRef = ref(database, `${user}/pokemons/${itemPokemon}`);
                            await remove(itemRef)
                            getData()
                            setCorStar('white')
                            setInBase(false)
                            Alert.alert('Removido')
                        }else{
                            await push(collectionRef, {
                                name: name,
                                id: id,
                                type: type[0],
                            });
                            getData()
                            Alert.alert('Adicionado')
                        }
                    }}> 
                        <FontAwesome name="star" size={24} color={corStar} />
                    </TouchableOpacity>
                </View>

                <ContainerPokemonInfo >
                    <Image  source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={{width:130,height:130, marginRight:25}} />
                    <View>
                        <TextId> {"#"+("000" + id).slice(-3)} </TextId>
                        <TextNome> {name} </TextNome>
                        <View style={{flexDirection:'row'}}>
                        {type.map((item, index)=> <View key={index} style={{backgroundColor: backgroundType[item.type.name], borderRadius:4, marginRight:5 }}><Text style={{padding:5,color:'#fff', textTransform:'capitalize' }}> {item.type.name} </Text></View>)}
                        </View>
                    </View>
                </ContainerPokemonInfo>

                <View style={styles.botoes}>
                    <TouchableOpacity onPress={() => {setActiveScreen('about')}}>
                        {
                            activeScreen === 'about'? <BotaoAtivo> About </BotaoAtivo> : <BotaoInativo> About </BotaoInativo>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setActiveScreen('evolution')}}>
                        {
                            activeScreen === 'evolution'?<BotaoAtivo> Evolution </BotaoAtivo> : <BotaoInativo> Evolution </BotaoInativo>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setActiveScreen('stats')}}>
                        {
                            activeScreen === 'stats'?<BotaoAtivo> Stats </BotaoAtivo> : <BotaoInativo> Stats </BotaoInativo>
                        }
                    </TouchableOpacity>
                </View>
                {
                    activeScreen === 'about' ?
                    isLoadingAbout?<TelaInfo>
                    <ActivityIndicator size='large' />
                    </TelaInfo>:
                    //ABOUT
                    <TelaInfo>
                        <ScrollView>
                            <TextIntroduction> {introduction.replaceAll("\n", " ").toLowerCase()} </TextIntroduction>
                            <Text style={{fontSize:16,fontWeight:700,marginTop:Platform.OS ==='android'?20:0, color:boxType[type[0].type.name]}} >Pokedéx Data</Text>
                            <View style={{flexDirection:'row',marginTop:22}}>
                                <Text style={styles.attributes}> Height: </Text>
                                <TextIntroduction> {(pokemon.height)/10 + "m"} </TextIntroduction>
                            </View>
                            <View style={{flexDirection:'row', marginTop:22}}>
                                <Text style={styles.attributes}> Weight: </Text>
                                <TextIntroduction> {(pokemon.weight)/10 + "kg"} </TextIntroduction>
                            </View>
                        </ScrollView>
                    </TelaInfo>:
                    activeScreen === 'evolution' ? 
                    isLoadingEvolution?<TelaInfo>
                        <ActivityIndicator size='large' />
                    </TelaInfo>:
                    //EVOLUTION
                    <TelaInfo>
                        <ScrollView style={{flex:1}}>
                            <Text style={{fontSize:16,fontWeight:700,marginBottom:30,marginTop:5, color:boxType[type[0].type.name]}} >Evolution Chart</Text>
                            <Lista>
                                {
                                    evolutions.map((evolution, index) =>
                                        index != 0 && index != 1?
                                        <>
                                            <PokemonEvolutionBox name={evolutions[index-1].name} imageId={evolutions[index-1].idImage}/>
                                            <View style={styles.levelContainer}>
                                                <FontAwesome name="arrow-right" size={20} color="#747476"/>
                                                <Text style={{fontWeight:700, fontSize:12}}>(Lv:{evolution.level})</Text>
                                            </View>
                                            <PokemonEvolutionBox name={evolution.name} imageId={evolution.idImage}/>
                                        </>
                                         :
                                         index == 1?
                                         <>
                                            <View style={styles.levelContainer}>
                                                <FontAwesome name="arrow-right" size={20} color="#747476"/>
                                                <Text style={{fontWeight:700, fontSize:12}}>(Lv:{evolution.level})</Text>
                                            </View>
                                            <PokemonEvolutionBox name={evolution.name} imageId={evolution.idImage}/>
                                         </>
                                        :
                                        <PokemonEvolutionBox name={evolution.name} imageId={evolution.idImage}/>

                                    )
                                }
                            </Lista>
                            <View style={{height:50}}></View>
                        </ScrollView>
                    </TelaInfo>:
                    isLoadingStats?<TelaInfo>
                    <ActivityIndicator size='large' />
                    </TelaInfo>:
                    //STATS
                    <TelaInfo>
                    <ScrollView>
                        <Text style={{fontSize:16,fontWeight:700,marginBottom:5,marginTop:5, color:boxType[type[0].type.name]}}>Base Stats</Text>
                        {
                            pokemon.stats.map(attribute =><View style={styles.statusBar} key={attribute.stat.name}>
                                <Text style={styles.attributes}>{attribute.stat.name} </Text>
                                <Text style={styles.attributeValue}>{attribute.base_stat} </Text>
                                <Progress.Bar
                                    progress={100} 
                                    borderWidth={0} 
                                    width={attribute.base_stat}
                                    color={boxType[type[0].type.name]}
                                    borderColor="green"
                                />
                            </View> )
                        }
                        <Text style={{fontSize:16,fontWeight:700,marginBottom:5,marginTop:5, color:boxType[type[0].type.name]}}>Abilities</Text>
                        {
                            pokemon.abilities.map(currentAbility => 
                                <Text style={styles.ability} key={currentAbility.ability.name}>
                                    {currentAbility.ability.name}
                                </Text>)
                        }
                    </ScrollView>
                </TelaInfo>
                }
            </View>
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
        fontWeight:'bold',
    },
    botoes:{
        marginTop:15,
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10
    },
    introduction:{
        color:'#747476',
        fontSize:16,
        fontWeight:400,
        textTransform:'capitalize',
    },
    statusBar:{
        width:'100%',
        padding:12,
        flexDirection:'row',
        alignItems:'center',
    },
    attributes:{
        fontWeight:'500',
        textTransform:'capitalize',
        width: 110,
    },
    attributeValue:{
        fontStyle:'normal',
        fontWeight:'normal',
        fontSize:16,
        lineHeight:19,
        textAlign:'right',
        marginLeft:20,
        marginRight:20,
    },
    ability:{
        fontStyle: 'normal',
        lineHeight:19,
        fontWeight:500,
        padding:12,
        textTransform:'capitalize',
    },
    levelContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center'
    }
})

export default PokemonInfo;