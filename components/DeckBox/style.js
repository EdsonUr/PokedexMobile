import styled from "styled-components/native";

export const Container = styled.View`
    width: 340px;
    height:171px;
    background-color:#1F3955;
    border-radius:14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display:flex;
    flex-direction:column;
    margin-bottom:25px;
`
export const InfoContainer = styled.View`
    margin-top:3px;
    width:100%;
    padding:6px;
    border-bottom-width:2px;
    border-bottom-color: #D9D9D9;
    border-bottom-style: solid;
`

export const ContainerDados = styled.View`
    display:flex;
    flex-direction:column;
    border-top-left-radius:14px;
    border-top-right-radius:14px;
    padding:0 11px;
    background-color:white;
    height:80%;
`

export const PokemonsContainer = styled.View`
    display:flex;
    width:100%;
    justify-content:space-around;
    flex-direction:row;
    margin-top:25px;
`

export const NomeTexto = styled.Text`
    text-transform:capitalize;
    font-weight:500;
`