import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View,Text, StyleSheet,Image, KeyboardAvoidingView, Alert } from 'react-native';
import { Container,HeaderWelcome, BodyInformation,InputEmail } from './style';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebase-config';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        navigation.replace('SearchScreen')
      }
    })
    return unsubscribe
  }, [])


  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
      console.log("Conta criada")
      Alert.alert("Conta criada")
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
      console.log("Entrou")
      const user = userCredential.user;
      console.log(user)
      navigation.replace('SearchScreen')
    })
    .catch(error =>{ 
      console.log(error)
      Alert.alert(error.message)
    })
  }

    return(
    <KeyboardAvoidingView style={{flex:1}}  behavior={Platform.OS === 'ios'? 'padding': null}>
      <HeaderWelcome>
        <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}} >Bem-Vindo!</Text>
      </HeaderWelcome>
      <BodyInformation style={InputEmail}>
        <View style={{width:'65%'}}>
          <Text style={{color:'#8572DA'}}>Email</Text>
          <TextInput style={styles.inputEmail}
            placeholder='email@gmail.com'
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={{width:'65%'}}>
          <Text style={{paddingTop:30,color:'#8572DA'}} >Password</Text>
          <TextInput style={styles.inputEmail}
            placeholder='password'
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.buttonEnter} onPress={handleSignIn} >
          <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={{color:'#B0A4E8', fontSize:20, paddingTop:10,fontWeight:'bold'}}>Registre-se</Text>
        </TouchableOpacity>
      </BodyInformation>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputEmail:{
      width:'100%',
      borderBottomWidth:2,
      borderBottomColor:'#8572DA',
      padding:5,
    },
    buttonEnter:{
      width:'65%',
      marginTop:58,
      height:50,
      borderRadius:28,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#1F3955',
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    }
  })

export default Login;