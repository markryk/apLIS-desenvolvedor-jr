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

  function formatCpf(text) {
    const badchars = /[^\d]/g
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/
    const cpf = new String(text).replace(badchars, "");
    return cpf.replace(mask, "$1.$2.$3-$4");
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
          Cadastrar
        </Button>
      </Form>

      {/*Mensagem de feedback */}
      {mensagem && <p> {mensagem} </p>}

      <Table striped bordered hover className="m-3">
        <thead>
          <tr>
            <th> # </th>
            <th> Nome </th>
            <th> Data de Nascimento </th>
            <th> Carteirinha </th>
            <th> CPF </th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr>
              <td> {p.id} </td>
              <td> {p.nome} </td>
              <td> {new Intl.DateTimeFormat("pt-BR").format(new Date(p.dataNascimento))} </td>
              <td> {p.carteirinha} </td>
              <td> {formatCpf(p.cpf)} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}