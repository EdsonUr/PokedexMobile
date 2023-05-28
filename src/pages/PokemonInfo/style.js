import styled from "styled-components/native";

export const ContainerPokemonInfo = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:15px;
`;

export const TextNome = styled.Text`
    font-weight:bold;
    color: #fff;
    font-size:26px;
    margin-bottom:5px;
    margin-top:5px;
    text-transform:capitalize;
`;
export const TextId = styled.Text`
    font-weight:bold;
    color:rgba(23, 23, 27, 0.6);
    font-size:16px;
`;

export const BotaoAtivo = styled.Text`
    color:#fff;
    padding:10px;
    font-weight:700;
`;

export const BotaoInativo = styled.Text`
    color:#fff;
    padding:10px;
    opacity:0.72;
`;

export const Lista = styled.View`
    display:flex;
    flex-direction:row;
    column-gap:43px;
    flex-wrap:wrap;
    row-gap:75px;
    align-items:center;
    justify-content:space-evenly;
`;

export const TelaInfo = styled.View`
    display:flex;
    flex:1;
    background-color:#fff;
    width:100%;
    padding:30px;
    border-top-right-radius:30px;
    border-top-left-radius:30px;
`;

export const TextIntroduction = styled.Text`
    color:#747476;
    font-size:16px;
    font-weight:400;
    text-transform:capitalize;
`;

export const OptionTitle = styled.Text`
    font-size:16px;
    font-weight:700;
    margin-top:20px;
`;

export const AttributesText = styled.Text`
    font-weight:500;
    text-transform:capitalize;
    width:110px;
`;

export const EvolutionTitle = styled.Text`
    font-size:16px;
    font-weight:700;
    margin-top:5px;
    margin-bottom:30px;
`