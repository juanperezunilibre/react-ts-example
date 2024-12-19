import { ReactNode } from "react";
import Aside from "./Aside";


const menu1 = ["Inicio", "Nosotros", "Contacto", "Trabaja con nosotros"]
const menu2 = ["Servicios", "Eventos", "Empleado del mes", "PQR"]


interface Props {
    children: ReactNode
}


function Layout({ children }: Props) {
    return <div>
    <header>
      <h1>Mi logo</h1>
    </header>
    <Aside menu={menu1} />
    <main>
      {children}
    </main>
    <Aside menu={menu2} />
    <footer>
      <p>Copyright &copy;</p>
    </footer>
  </div>
}

export default Layout;