import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Clínica</h2>

      <Link to="/medicos" style={styles.link}> Médicos </Link>
      <Link to="/pacientes" style={styles.link}> Pacientes </Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#2c3e50",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px"
  },
  link: {
    color: "#fff",
    margin: "10px 0",
    textDecoration: "none"
  }
};