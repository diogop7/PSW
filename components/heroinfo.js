import React from 'react';

export let HeroInfo = (props) =>{
    return <div class="box">
    <img src={props.imagem} alt={props.nome}></img>
    <p>{props.nome}</p>
    </div>
}