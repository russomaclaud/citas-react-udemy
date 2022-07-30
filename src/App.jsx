import { useEffect, useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App()
{

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})

  // Se ejecuta primero y revisa sí hay algo en localStorage y se colaca en el State
  useEffect(() =>
  {
    const obtenerLocalStorage = () =>
    {
      const pacientesLocalStorage = JSON.parse(localStorage.getItem('pacientes')) ?? []
      // console.log(pacientesLocalStorage);
      setPacientes(pacientesLocalStorage);
    }
    obtenerLocalStorage()
  }, [])

  // La siguiente vez ya ejecuta ya detecta que hay algo en setPacientes, 
  // como esta sincronizando ese estado lo mantiene en el localStorage
  useEffect(() =>
  {
    // console.log('Componente listo o cambió pacientes');
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])


  const eliminarPaciente = (id) =>
  {
    // console.log('Eliminando paciente', id);
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)

    // console.log(pacientesActualizados);
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />

        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
