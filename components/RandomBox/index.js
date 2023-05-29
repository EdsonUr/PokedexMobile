import React from 'react'
import {Text,TouchableOpacity, Image, View } from 'react-native';
import { Container, Nome } from './style'
import boxType from '../../src/GlobalStyles/boxType'

const RandomBox = ({name, id, type}) =>{
  return (
    <Container style={{backgroundColor:type == null? 'white':boxType[type[0].type.name] }}>
        {
            name === null?
            <Text>Nada</Text>
            :
            <>
                <Image  source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={{width:75,height:75}} />
                <Nome> {name} </Nome>
            </>
        }
    </Container>
  )
}

export default RandomBox