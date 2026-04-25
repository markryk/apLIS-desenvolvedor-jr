import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMedicos, createMedico, updateMedico, deleteMedico } from "../services/apiMedicos";

export default function Medicos() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [nome, setNome] = useState("");
  const [CRM, setCRM] = useState("");
  const [UFCRM, setUFCRM] = useState("");

  const [editando, setEditando] = useState(false);
  const [idAtual, setIdAtual] = useState(null);
  const [mensagem, setMensagem] = useState("");

  async function carregar() {
    const res = await getMedicos();
    setMedicos(res.data);
  }  

  async function salvar(e) {
    e.preventDefault();

    try {
      if (editando) {
        await updateMedico({id: idAtual, nome, CRM, UFCRM});

        setMensagem("Médico atualizado!");
      } else {
        await createMedico({ nome, CRM, UFCRM });
        setMensagem("✅ Médico cadastrado!");
      }

      limpar();
      carregar();

    } catch (error) {
      setMensagem("❌ Erro na operação!");
    }
  }

  function editar(medico) {
    setEditando(true);
    setIdAtual(medico.id);
    setNome(medico.nome);
    setCRM(medico.crm);
    setUFCRM(medico.ufcrm);
  }

  async function excluir(id) {
    if (!confirm("Deseja excluir este médico?")) return;

    await deleteMedico(id);
    setMensagem("Médico removido");
    carregar();
  }

  function limpar() {
    setNome("");
    setCRM("");
    setUFCRM("");
    setEditando(false);
    setIdAtual(null);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2> Médicos </h2>

      <Form onSubmit={salvar}>
        <Form.Group className="mb-3">
          <Form.Label> Nome </Form.Label>
          <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> CRM </Form.Label>
          <Form.Control type="text" placeholder="Nº CRM" value={CRM} onChange={(e) => setCRM(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> UFCRM </Form.Label>
          <Form.Select value={UFCRM} onChange={(e) => setUFCRM(e.target.value)}>
            <option> </option>
            <option value="AC"> AC </option>
            <option value="AL"> AL </option>
            <option value="AM"> AM </option>
            <option value="AP"> AP </option>
            <option value="BA"> BA </option>
            <option value="CE"> CE </option>
            <option value="DF"> DF </option>
            <option value="ES"> ES </option>
            <option value="GO"> GO </option>
            <option value="MA"> MA </option>
            <option value="MG"> MG </option>
            <option value="MS"> MS </option>
            <option value="MT"> MT </option>          
            <option value="PA"> PA </option>
            <option value="PB"> PB </option>
            <option value="PE"> PE </option>
            <option value="PI"> PI </option>
            <option value="PR"> PR </option>
            <option value="RJ"> RJ </option>
            <option value="RN"> RN </option>
            <option value="RO"> RO </option>
            <option value="RR"> RR </option>
            <option value="RS"> RS </option>          
            <option value="SC"> SC </option>
            <option value="SE"> SE </option>
            <option value="SP"> SP </option>          
            <option value="TO"> TO </option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit"> {editando ? "Atualizar" : "Cadastrar"} </Button>

        {editando && (
          <Button variant="secondary" onClick={limpar} className="ms-2"> Cancelar </Button>
        )}
      </Form>

      {/*Mensagem de feedback */}
      {mensagem && <p> {mensagem} </p>}

      <Table striped bordered hover className="m-3">
        <thead>
          <tr>
            <th> # </th>
            <th> Nome </th>
            <th> CRM </th>
            <th> UFCRM </th>
            <th> Ações </th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id}>
              <td> {m.id} </td>
              <td> {m.nome} </td>
              <td> {m.crm} </td>
              <td> {m.ufcrm} </td>
              <td>
                <Button size="sm" onClick={() => editar(m)}> Editar </Button>
                <Button size="sm" variant="danger" className="ms-2" onClick={() => excluir(m.id)}> Excluir </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}