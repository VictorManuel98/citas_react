import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";
import {useState, useEffect} from 'react'
import Header from "./components/header";
function App() {
 // const initial = JSON.parse(localStorage.getItem('pacientes')) ?? [];
 const pacienteLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
 console.log(pacienteLS);

  const [pacientes, setPacientes] = useState(pacienteLS);
  const [paciente, setPaciente] = useState({});


  useEffect(()=> {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  },[pacientes])
  
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
      <div className="container mx-auto mt-20">
      <Header
      />
      <div className="m-12 md:flex">
      <Formulario
      pacientes= {pacientes}
      setPacientes={setPacientes}
      setPaciente={setPaciente}
      paciente= {paciente}
      />
      <ListadoPacientes 
      pacientes = {pacientes}
      setPaciente = {setPaciente}
      eliminarPaciente= {eliminarPaciente}
      />
      </div>
      
      </div>
  )
}

export default App
