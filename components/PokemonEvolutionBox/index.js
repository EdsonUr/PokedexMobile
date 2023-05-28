import react from "react";
import { Container} from "./style";
import {Text,TouchableOpacity, Image, View,StyleSheet,ImageBackground } from 'react-native';
import pokeball from '../../assets/Pokeball.png'

const PokemonEvolutionBox = ({name,imageId}) =>{
    return(
        <Container>
            <ImageBackground style={styles.fundo} source={pokeball} >
                <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`}}  style={{width:75,height:75}}/>
            </ImageBackground>
            <Text style={{fontWeight:500, color: 'rgba(23, 23, 27, 0.6)',fontSize:14 }}>{"#"+("000" + imageId).slice(-3)} </Text>
            <Text style={styles.texto}> {name} </Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    fundo:{
        height:100,
        width:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    texto:{
        fontSize:16,
        fontWeight:700,
        textTransform:'capitalize',
    }
})

export default PokemonEvolutionBox;