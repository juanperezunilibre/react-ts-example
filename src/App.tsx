import { useState } from "react";

import "./App.css";
import Layout from "./Layout";
import Button from "./components/Button";
import { Libro } from "./Libro";

function App() {
  const [contador, setContador] = useState(0);

  const libro = {

  }

  const increment = () => {
    if (contador + 1 < 5) {
      setContador(contador + 1)
    }
  }

  const decrement = () => {
    if(contador - 1 > 0) {
      setContador(contador-1)
    }
  };

  return (
    <Layout>
      <Button text="-" onClick={decrement} disabled={contador - 1 <= 0} >-</Button>
      <h1>{contador}</h1>
      <Button text="+" onClick={increment} disabled={contador + 1 >= 5}>+</Button>
    </Layout>
  );
}

export default App;
