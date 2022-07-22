import { HashRouter } from "react-router-dom";
import Router from "./routers/index";
import "./app.less";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;
