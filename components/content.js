import React, { useState, useEffect } from 'react';
import { HeroInfo } from './heroinfo.js';
import Loader from './loader';
import heroesList from '../shared/heroes.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import HeroForm from './heroForm';


export let Content = () => {
    const [listOfHeroes, setListOfHeroes] = useState(heroesList);
    const [favoriteHeroes, setFavoriteHeroes] = useState([]);
    const [randomIndexes, setRandomIndexes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const generateRandomNumbers = () => {
        let randomIndexes = [];
        while (randomIndexes.length < 3) {
            let randomIndex = Math.floor(Math.random() * heroesList.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        setRandomIndexes(randomIndexes);
    };

    useEffect(() => {
        setTimeout(() => {
            generateRandomNumbers();
            setIsLoading(false);

            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }, 2000);
    }, []);

    const favoriteHeroInfos = listOfHeroes.filter(hero => favoriteHeroes.includes(hero.id));
    
    const handleSubmit = (newHero) => {
        setListOfHeroes([...listOfHeroes, newHero]);
        navigate('/dashboard'); 
    };


    return (
        <Routes>
            <Route path="/" element={
                <div>
                    <h3>Heróis Favoritos</h3>
                    {favoriteHeroes.length > 0 ? (
                        loading ? (
                            <Loader />
                        ) : (
                            <div>
                                <div className="container">
                                    {favoriteHeroInfos.map((hero, index) => (
                                        <HeroInfo
                                            key={index}
                                            nome={hero.name}
                                            imagem={hero.image}
                                            isFavorite={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        <p>Adicione heróis aos favoritos na dashboard</p>
                    )}
                </div>
            } />
            <Route path="/dashboard" element={
                <Dashboard
                    listOfHeroes={listOfHeroes}
                    setListOfHeroes={setListOfHeroes}
                    favoriteHeroes={favoriteHeroes}
                    setFavoriteHeroes={setFavoriteHeroes}
                />
            } />

            <Route
                path="/dashboard/add"
                element={<HeroForm onSubmit={handleSubmit} />}
            />    

            <Route
                path="/dashboard/edit/:id"
                element={<HeroForm onSubmit={handleSubmit} listOfHeroes={listOfHeroes} />}
            />

        </Routes>
    );
}

export default Content;