import { Link } from 'react-router-dom';

export let Header = (props) => {
  return (
    <div className="header-div">
      <h1>{props.nome_projeto}</h1>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <h3>Desenvolvido por {props.nome}</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <button className="nav-button">Home</button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <button className="nav-button">Dashboard</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};






/* export let Header = (props) => {
    return (
        <div class="header-div">
            <h1>{props.nome_projeto}</h1>
            <div class="logo">
                <img src="logo.png" alt="Logo"></img> 
            </div>
            <h3>Desenvolvido por {props.nome}</h3>
        </div>
        );
    } */