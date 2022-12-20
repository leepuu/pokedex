import { Routes, Route } from "react-router-dom";
import Layout from "layouts";
import Detail from "pages/Detail";
import Main from "pages/Main";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />}></Route>
        <Route path="/pokemon/:pokemonName" element={<Detail />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
