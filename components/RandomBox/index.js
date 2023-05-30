import { useNavigation, useRoute } from "@react-navigation/native";
import React from 'react'
import {Text,TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Container, Nome } from './style'
import boxType from '../../src/GlobalStyles/boxType'

const RandomBox = ({name, id, type}) =>{
  const navigation = useNavigation()
  return (
    <Container style={{backgroundColor:type == null? 'white':boxType[type[0].type.name] }}>
        {
            name === null?
            <Text>Nada</Text>
            :
            <TouchableOpacity style={styles.containerButton} onPress={()=> navigation.navigate('PokemonInfo', {name, id, type})}>
                <Image  source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={{width:75,height:75}} />
                <Nome> {name} </Nome>
            </TouchableOpacity>
        }
    </Container>
  )
}

const styles = StyleSheet.create({
  containerButton:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
})

export default RandomBox