import { RestCountryController } from "./api/RestCountryController";
import "./App.css";
import { CountryList } from "./components/CountryList";

function App() {
  const controller = new RestCountryController();

  return (
    <div className="App">
      <CountryList controller={controller} />
    </div>
  );
}

export default App;
