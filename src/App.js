import './App.css';
import { Layout } from './Components/layout/layout';
import { Header } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { Board } from './Components/board/board';
import {Card} from "./Components/board/card/card";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Board/>
  },
  {
      path: "/tasks/:cardId",
      element: <Card/>
  }
  ])

function App() {
  return (
    <Layout>
      <Header/>
      <main>
          <RouterProvider router={router}/>
      </main>
      <Footer/>
    </Layout>
  );
}

export default App;
 