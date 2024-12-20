import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { API } from "../instances";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface Cliente {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  fecha_nacimiento?: Date;
  image?: string;
  activo?: boolean;
}

const Home = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleClose = () => setShow(false);

  const fetchClientes = () => {
    API.get("/clientes").then((res) => setClientes(res.data));
  };

  const onSubmit = (values: Cliente) => {
    const { id, activo, ...rest } = values;
    API({
      method: editar ? "PUT" : "POST",
      url: editar ? "/cliente/" + id : "/cliente",
      data: rest,
    })
      .then((res) => {
        reset();
        setShow(false);
        fetchClientes();
        Swal.fire("Exito", res.data.message, "success");
      })
      .catch((err) =>
        Swal.fire("Error", err?.response?.data?.message, "error")
      );
  };

  const handleEditar = (cliente: Cliente) => {
    setEditar(true);
    Object.entries(cliente).forEach(([key, value]) => {
      setValue(key, value);
    });

    setShow(true);
  };

  const handleNuevoCliente = () => {
    setEditar(false);
    setShow(true);
  };

  const handleEliminar = (id: number) => {
    Swal.fire({
      title: "Eliminar cliente",
      text: "Esta seguro? esto no se puede deshacer",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete("/cliente/" + id)
          .then((res) => {
            Swal.fire("Exito", res.data.message, "success");
            fetchClientes();
          })
          .catch((err) =>
            Swal.fire("Error", err?.response?.data?.message, "error")
          );
      }
    });
  };

  return (
    <main className="w-full h-screen bg-green-500 p-8 flex flex-col gap-4 items-end">
      <Button onClick={handleNuevoCliente}>Crear nuevo cliente</Button>
      <div className="h-full overflow-y-auto grid grid-cols-5 gap-4 place-content-center ">
        {clientes.map((cliente) => (
          <Card key={cliente.id}>
            <Card.Img variant="top" src={cliente.image} />
            <Card.Body>
              <Card.Title>
                {cliente.nombre} {cliente.apellidos}
              </Card.Title>
              <Card.Text>{cliente.email}</Card.Text>
              <Card.Text>{cliente.fecha_nacimiento ?? ""}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => handleEditar(cliente)}>Editar</Button>
              <Button variant="danger" onClick={() => handleEliminar(cliente.id)}>Eliminar</Button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editar ? "Editar" : "Crear"} cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input readOnly {...register("id")} />
            <Form.Group className="mb-3">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="99999999"
                {...register("documento")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                {...register("nombre")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tus apellidos"
                {...register("apellidos")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoComplete="off"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://imagen..."
                {...register("image")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control type="date" {...register("fecha_nacimiento")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
};

export default Home;
