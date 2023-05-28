import styled from "styled-components/native";

export const UserContainer = styled.View`
    display:flex;
    flex-direction:row;
    align-items:center;
    column-gap:10px;
    width:100%;
    padding: 0 32px;
    margin-bottom:23px;
`

export const UserGreetings = styled.Text`
    font-size:24px;
    color:#393939;
    font-weight:600;
    text-transform:capitalize;
`

export const InfoContainer = styled.TouchableOpacity`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    border: 1px solid #E0E0E0;
    width:100%;
    padding: 16px 32px;
`