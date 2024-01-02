import React, { useState, useEffect } from 'react';
import heroesList from '../shared/heroes.js';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { saveHeroes } from '../shared/api.js';
import { BASE_URL, PRIVATE_ID } from '../shared/api.js';
import { saveTopHeroes } from '../shared/api.js';


const Dashboard = ({ listOfHeroes, setListOfHeroes, favoriteHeroes, setFavoriteHeroes }) => {
    const [localListOfHeroes, setLocalListOfHeroes] = useState(listOfHeroes);
    const [localFavoriteHeroes, setLocalFavoriteHeroes] = useState(favoriteHeroes);
    const [nextId, setNextId] = useState(7); 

    useEffect(() => {
        setLocalListOfHeroes(listOfHeroes);
        setLocalFavoriteHeroes(favoriteHeroes);
    }, [listOfHeroes, favoriteHeroes]);

    const handleDelete = async (id) => {
        try {
            const updatedHeroes = listOfHeroes.filter(hero => hero.id !== id);
    
            const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedHeroes), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete hero');
            }


            setListOfHeroes(updatedHeroes);
        } catch (error) {
            console.error('Error:', error);
        }
    };
     

    const handleToggleFavorite = async (id) => {
        const updatedHeroes = localListOfHeroes.map(hero =>
            hero.id === id ? { ...hero, isFavorite: !hero.isFavorite } : hero
        );
        setLocalListOfHeroes(updatedHeroes);
    
        const updatedFavorites = updatedHeroes.filter(hero => hero.isFavorite).map(hero => hero.id);
    
        if (updatedFavorites.length <= 3) {
            setLocalFavoriteHeroes(updatedFavorites);
            setFavoriteHeroes(updatedFavorites);
    
            try {
                await saveTopHeroes(updatedFavorites);
            } catch (error) {
                console.error('Error saving top heroes:', error);
            }
        }
    
        setListOfHeroes(updatedHeroes);
    };
      

    const handleAddNewHero = () => {
        const newHero = {
            id: nextId,
            name: 'Novo Herói',
            image: 'url_da_imagem',
            super_power: 'Poder',
            isFavorite: false,
        };

        const updatedHeroes = [...localListOfHeroes, newHero];
        setLocalListOfHeroes(updatedHeroes);
        setListOfHeroes(updatedHeroes);
        setNextId(nextId + 1); 
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <Link to="/dashboard/add">
                <button>Adicionar Novo Herói</button>
            </Link>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th className="centered">ID</th>
                        <th className="centered">Imagem</th>
                        <th className="centered">Nome</th>
                        <th className="centered">Superpoder</th>
                        <th className="centered">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {localListOfHeroes.map((hero, index) => (
                        <tr key={index}>
                            <td>{index < heroesList.length ? hero.id : nextId + (index - heroesList.length)}</td>
                            <td><img src={hero.image} alt={hero.name} style={{ width: '100px' }} /></td>
                            <td>{hero.name}</td>
                            <td>{hero.super_power ? hero.super_power : 'N/D'}</td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(hero.id)}>
                                    Eliminar
                                </button>
                                {!localFavoriteHeroes.includes(hero.id) && favoriteHeroes.length < 3 && (
                                    <button className="favorite" onClick={() => handleToggleFavorite(hero.id)}>
                                        Adicionar aos Favoritos
                                    </button>
                                )}
                                {localFavoriteHeroes.includes(hero.id) && (
                                    <button className="favorite" onClick={() => handleToggleFavorite(hero.id)}>
                                        Remover dos Favoritos
                                    </button>
                                )}
                                <Link to={`/dashboard/edit/${hero.id}`}>
                                    <button className="edit">
                                        Editar
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
