
interface Props {
    menu: string[]
}


function Aside({menu = []}: Props) {
  return (
    <aside>
      <ul>
        {menu.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
