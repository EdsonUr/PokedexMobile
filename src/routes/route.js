import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import PokemonsFavoritos from '../pages/PokemonsFavoritos';
import DecksGerados from '../pages/DecksGerados';
import Home from '../pages/Home';
import PokemonInfo from '../pages/PokemonInfo';
import FontAwesome from '@expo/vector-icons/FontAwesome' 
import Login from '../pages/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

function Tabs(){
   return(
    <Tab.Navigator 
         initialRouteName="Search"
         screenOptions={{headerShown:false}}
        >
            <Tab.Screen
             name="Home"
             component={Home} 
             options={{
                tabBarIcon:({ size, color }) => (
                    <Entypo name="home" size={size} color={color} />
                )
            }}
            />
            <Tab.Screen
             name="Search"
             component={Search} 
             options={{
              tabBarIcon:({ size, color }) => (
                  <FontAwesome name='search' size={size} color={color} />
              )
            }}
            />
            <Tab.Screen
             name="User"
             component={Profile} 
             options={{
                tabBarIcon:({ size, color }) => (
                    <Feather name="user" size={size} color={color} />
                )
            }}
            />
        </Tab.Navigator>
   )
}

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} options={{gestureEnabled:false}}/>
        <Stack.Screen name="SearchScreen" component={Tabs} options={{gestureEnabled:false}}/>
        <Stack.Screen name="PokemonInfo" component={PokemonInfo}/>
        <Stack.Screen name="PokemonsFavoritos" component={PokemonsFavoritos} options={{headerShown:true, headerBackTitle:"Voltar", headerTitle:"Favoritos"}}/>
        <Stack.Screen name="DecksGerados" component={DecksGerados} options={{headerShown:true, headerBackTitle:"Voltar", headerTitle:"Decks"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}