## Estrutura do Frontend

```
src/
 ├── components/
 │    ├── Sidebar.jsx
 │
 ├── pages/
 │    ├── Medicos.jsx
 │    ├── Pacientes.jsx
 │
 ├── services/
 │    ├── apiMedicos.js
 │    ├── apiPacientes.js
 │
 ├── App.jsx
 ├── main.jsx
 └── styles.css
```

### Problemas com CORS

em PHP: criar arquivo CORS em backendphp/api (api/cors.php); incluir no arquivo 'index.php'.

em JS: instalar pacote CORS em backendjs via npm; chamar o pacote no arquivo 'server.js'.

### Rodar projeto

#### Backend PHP: 
Navega até a pasta "\apLIS-desenvolvedor-jr"
```
php -S localhost:8000 -t backendphp (porta padrão 8000, pode ser qualquer outra)
```

Testar na URL: [http://localhost:8000/api/v1/medicos](http://localhost:8000/api/v1/medicos)

#### Backend JS: 
Navega até a pasta "\backendjs"
```
npm start
```

Servidor rodando em http://localhost:3000

Testar na URL: [http://localhost:3000/api/v1/pacientes](http://localhost:3000/api/v1/pacientes)

#### Frontend
Navega até a página "\app"
```
npm run dev
```

Servidor rodando em http://localhost:5173
Testar na URL: [http://localhost:5173](http://localhost:5173)

### 

Importar react-bootstrap