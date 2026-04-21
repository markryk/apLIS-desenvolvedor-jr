import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { getPacientes, createPaciente } from "../services/apiPacientes";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carteirinha, setCarteirinha] = useState("");
  const [cpf, setCPF] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregar() {
    const res = await getPacientes();
    setPacientes(res.data);
  }

  function BasicExample() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  async function salvar(e) {
    e.preventDefault();

    try {

      const res = await createPaciente({ nome, dataNascimento, carteirinha, cpf });

      if (res.data.status == "sucesso") {
        setMensagem("✅ Paciente cadastrado com sucesso!");
        setNome("");
        setDataNascimento("");
        setCarteirinha("");
        setCPF("");
        carregar();
      } else {
        setMensagem("❌ Erro ao cadastrar paciente");
      }

    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro na requisição");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2> Pacientes </h2>

      {/* <form onSubmit={salvar}>
        <input type="text" class="form-control" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <br />

        <input type="date" placeholder="Data de nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
        <br />

        <input type="number" placeholder="Carteirinha" value={carteirinha} onChange={(e) => setCarteirinha(e.target.value)}/>
        <br />

        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)}/>
        <br />

        <button type="submit">Cadastrar</button>
      </form>*/}

      <Form onSubmit={salvar}>
        <Form.Group className="mb-3">
          <Form.Label> Nome </Form.Label>
          <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Data de Nascimento </Form.Label>
          <Form.Control type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Carteirinha </Form.Label>
          <Form.Control type="number" placeholder="Nº carteirinha" value={carteirinha} onChange={(e) => setCarteirinha(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> CPF </Form.Label>
          <Form.Control type="text" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/*Mensagem de feedback */}
      {mensagem && <p> {mensagem} </p>}

      {/*<ul>
        {pacientes.map((p) => (
          <li key={p.id}>
            {p.nome} - {p.dataNascimento} - {p.carteirinha} - {p.cpf}
          </li>
        ))}
      </ul>*/}

      BasicExample();
    </div>
  );
}