import { useEffect, useState } from "react";
import { getMedicos, createMedico } from "../services/apiMedicos";

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [nome, setNome] = useState("");
  const [CRM, setCRM] = useState("");
  const [UFCRM, setUFCRM] = useState("");
  const [mensagem, setMensagem] = useState("");
  //const [tipoMsg, setTipoMsg] = useState("");

  async function carregar() {
    const res = await getMedicos();
    setMedicos(res.data);
  }  

  async function salvar(e) {
    e.preventDefault();

    try {
        const res = await createMedico({ nome, CRM, UFCRM });

        if (res.data[0].status == "sucesso") {
            //setTipoMsg("sucesso");
            setMensagem("✅ Médico cadastrado com sucesso!");
            setNome("");
            setCRM("");
            setUFCRM("");
            carregar();
        } else {
            setMensagem("❌ Erro ao cadastrar médico!");
        }
    } catch (error) {
        setMensagem("❌ Erro na requisição!");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2> Médicos </h2>

      <form onSubmit={salvar}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <br/>

        <input placeholder="CRM" value={CRM} onChange={(e) => setCRM(e.target.value)}/>
        <br/>

        <input placeholder="UFCRM" value={UFCRM} onChange={(e) => setUFCRM(e.target.value)}/><br/>

        <button type="submit"> Cadastrar </button>
      </form>

      {/*Mensagem de feedback */}
      {mensagem && <p>{ mensagem }</p>}

      <ul>
        {medicos.map((m) => (
          <li key={m.id}>
            {m.nome} - {m.crm} - {m.ufcrm}
          </li>
        ))}
      </ul>
    </div>
  );
}