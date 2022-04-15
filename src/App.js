import './App.css';
import RouterPage from "../src/component/router/Router";
import HeaderContainer from "../src/containers/HeaderContainer";


const App = () => {
  return (
    <div className="App">
      <HeaderContainer />
      <div className="container">
        <RouterPage />
      </div>
    </div>
  );
}

export default App;
