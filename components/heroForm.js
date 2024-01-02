import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './heroForm.css';
import { saveHeroes } from '../shared/api.js';
import { BASE_URL, PRIVATE_ID } from '../shared/api.js';


const HeroForm = ({ onSubmit, listOfHeroes }) => {
    const [heroInfo, setHeroInfo] = useState({
        id: '',
        name: '',
        image: '',
        super_power: ''
    });

    const [mode, setMode] = useState('add');
    const { id } = useParams();

    useEffect(() => {
        if (id && mode !== 'edit') {
            const foundHero = listOfHeroes.find(hero => hero.id === parseInt(id));
            if (foundHero) {
                setHeroInfo(foundHero);
                setMode('edit');
            }
        } else if (!id && mode !== 'add') {
            setHeroInfo({
                id: '',
                name: '',
                image: '',
                super_power: ''
            });
            setMode('add');
        }
    }, [id, listOfHeroes, mode]);
    
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHeroInfo({ ...heroInfo, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            if (mode === 'add') {
            } else {
                const updatedList = listOfHeroes.map(hero =>
                    hero.id === heroInfo.id ? heroInfo : hero
                );
    
                const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedList), 
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update hero');
                }
    
                onSubmit(heroInfo);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const title = mode === 'add' ? 'Adicionar Super-Herói' : 'Editar Super-Herói';


    return (
        <div className="hero-form">
            <h2 className="form-title">{title}</h2>
            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Nome:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={heroInfo.name}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="form-label">Imagem (URL):</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={heroInfo.image}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="superpower" className="form-label">Superpoder:</label>
                    <input
                        type="text"
                        name="super_power"
                        id="superpower"
                        value={heroInfo.super_power}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Gravar</button>
                    <Link to="/dashboard">
                        <button type="button" className="btn-back">Voltar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default HeroForm;