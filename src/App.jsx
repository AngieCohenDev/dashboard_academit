import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import MainArticle from "./pages/MainArticle";
import NewArticle from "./pages/NewArticle";
import Article from "./pages/Article";
import Video from "./pages/Video";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="header" element={<Header />} />
          <Route path="article" element={< MainArticle/>} />
          <Route path="newarticle" element={< NewArticle/>} />
          <Route path="articles" element={< Article/>} />
          <Route path="cursos" element={< Video/>} />
        </Route>
        <Route path="login" element={<div>Este es el login</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
