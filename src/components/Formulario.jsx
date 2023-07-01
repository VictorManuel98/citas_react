import { useState, useEffect } from 'react'
import Error1 from './Error1';
function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas)
    }
  }, [paciente])



  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }
  const handleSumit = (e) => {
    e.preventDefault();
    //validacion de formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return;
    }
    setError(false)
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId()
    }
    if (paciente.id) {
      //console.log('editando');
      objetoPaciente.id = paciente.id;
      console.log(objetoPaciente);
      const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === objetoPaciente.id ? objetoPaciente : pacienteState )
      setPacientes(pacienteActualizado)
      setPaciente({})
    }else{
      //console.log('nuevo registr');
      objetoPaciente.id=generarId();
    setPacientes([...pacientes, objetoPaciente]);

    }
    //console.log(objetoPaciente);
    //reiniciar valores
    setNombre('')
    setPropietario('')
    setEmail('');
    setFecha('');
    setSintomas('')

  }
  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h1 className='font-black text-3xl text-center'>Seguimiento pacientes</h1>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administrarlos</span>
      </p>
      <form
        onSubmit={handleSumit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        {error && <Error1>Todos los campos son obligatorios</Error1>}
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
            Nombre de Mascota
          </label>
          <input id='mascota'
            type="text"
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
            Nombre de propietario
          </label>
          <input id='propietario'
            type="text"
            placeholder='Nombre de propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)} />

        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
            Email
          </label>
          <input id='email'
            type="email"
            placeholder='Email @ contacto propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
            Alta
          </label>
          <input id='alta'
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
            Sintomas
          </label>
          <textarea id="sintomas" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Describe los sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>
        <input type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} />
      </form>
    </div>
  )
}

export default Formulario
