import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getMedicoById } from "../services/apiMedicos";

export default function EditarMedico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [CRM, setCRM] = useState("");
  const [UFCRM, setUFCRM] = useState("");
  const [mensagem, setMensagem] = useState("");

  //Carregar dados do médico
  useEffect(() => {
    async function carregar() {
      const res = await getMedicoById(id);
      setNome(res.data.nome);
      setCRM(res.data.CRM);
      setUFCRM(res.data.UFCRM);
    }

    carregar();
  }, [id]);

  //Salvar edição
  async function salvar(e) {
    e.preventDefault();

    try {
      await updateMedico({ id, nome, CRM, UFCRM });

      setMensagem("✅ Médico atualizado!");

      //Voltar para lista após 1.5s
      setTimeout(() => {
        navigate("/medicos");
      }, 1500);

    } catch {
      setMensagem("❌ Erro ao atualizar");
    }
  }

  return (
    <div>
      <h2> Editar Médico </h2>

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

        <Button variant="primary" type="submit"> Editar </Button>
      </Form>

      {/*<form onSubmit={salvar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
        />

        <button type="submit">Salvar</button>

        <button type="button" onClick={() => navigate("/medicos")}>
          Cancelar
        </button>
      </form>*/}

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}