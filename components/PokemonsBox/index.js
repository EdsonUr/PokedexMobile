import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {Text,TouchableOpacity, Image, View } from 'react-native';
import backgroundType from '../../src/GlobalStyles'
import boxType from '../../src/GlobalStyles/boxType'
import { Container, ContainerDados} from './style';

const PokemonBox = ({name, id, type}) => {
  const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={()=> navigation.navigate('PokemonInfo', {name, id, type})}>
          <Container style={{backgroundColor: boxType[type[0].type.name]}}>
            <ContainerDados>
              <Text style={{fontWeight:'bold', color: 'rgba(23, 23, 27, 0.6)',fontSize:16 }}>{"#"+("000" + id).slice(-3)} </Text>
              <Text style={{fontWeight:'bold', color:'#fff',fontSize:26, marginBottom:5, marginTop:5, textTransform:'capitalize' }}>{name}</Text>
              <View style={{flexDirection:'row'}}>
               {type.map((item, index)=> <View key={index} style={{backgroundColor: backgroundType[item.type.name], borderRadius:4,marginRight:5}}><Text style={{padding:5,color:'#fff',textTransform:'capitalize'}}> {item.type.name} </Text></View>)}
              </View>
            </ContainerDados>
            <Image  source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} style={{width:130,height:130}} />
          </Container>
        </TouchableOpacity>
    )
}

export default PokemonBox;