import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import {getAuth} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import { UserContainer,UserGreetings,InfoContainer } from "./style";
import { Platform } from "react-native";

const Profile = () => {
    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignOut = () =>{
        auth
            .signOut()
            .then(() =>{
                navigation.replace("Login") 
            })
            .catch(error => alert(error.message))
    }

    return(
        <View style={styles.container}>
            <UserContainer style={styles.usercontainer}>
                <Image
                    source={require('../../../assets/profilePicture.png')}
                    style={{width:70, height:70, borderRadius:30}}
                />
                <UserGreetings>Olá, {auth.currentUser?.email.substring(0, auth.currentUser.email.indexOf("@"))} </UserGreetings>
            </UserContainer>
            <InfoContainer onPress={() => navigation.navigate("PokemonsFavoritos")}>
                <View style={{flexDirection:'row', alignItems:'center', columnGap:23}}>
                <FontAwesome name="star" size={22} color="#4A3631"/>
                <Text>Pokemons favoritos</Text>
                </View>
                <FontAwesome name="angle-right" size={22} color="#4A3631"/>
            </InfoContainer>
            <InfoContainer onPress={() => navigation.navigate("DecksGerados")}>
                <View style={{flexDirection:'row', alignItems:'center', columnGap:23}}>
                <FontAwesome name="star" size={22} color="#4A3631"/>
                <Text>Decks gerados</Text>
                </View>
                <FontAwesome name="angle-right" size={22} color="#4A3631"/>
            </InfoContainer>
            <View style={{flex:1, display:'flex', justifyContent:'flex-end', marginBottom:40}}>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText} >Sign out</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    text:{
        fontSize:25,
        fontWeight:'bold'
    },
    button:{
        alignSelf:'flex-end',
        backgroundColor:'red',
        padding:15,
        borderRadius:16,
        alignItems:'center',
        marginTop: 10,
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    usercontainer:{
        marginTop:Platform.OS === 'android'? 42: 70,
    }
})

export default Profile;
