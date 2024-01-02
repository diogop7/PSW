import logo from './logo.svg';
import './App.css';
import './components/content.css';
import './components/header.css';
import './components/footer.css';
import React, { Component, useState } from 'react';
import { Header } from './components/header';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { BrowserRouter } from 'react-router-dom';



function App() {
  const [data, setData] = useState({
    myname: "Diogo Pereira",
    project_name: "League of Heroes"
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header nome={data.myname} nome_projeto={data.project_name} />
        <Content />
        <Footer nome={data.myname} nome_projeto={data.project_name} />
      </div>
    </BrowserRouter>
  );
}

export default App;
