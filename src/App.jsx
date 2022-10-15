import { useEffect, useState } from 'react'
import { eliminarRegistro, guardarRegistro, listarRegistro } from './services/RegistroServices'

const initData = {
  _id: "",
  description: "",
  typeRegister: "",
  amount: 0
}

function App() {
  const [lista, setLista] = useState([])
  const [datos, setDatos] = useState(initData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nDatos = { ...datos, [name]: value };
    setDatos(nDatos)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await guardarRegistro(datos);
    setDatos(initData)
    listar()
  }

  const listar = async () => {
    setLista(await listarRegistro())
    console.log(lista)
    /*const result = await listarRegistro()
    setData(result)*/
  }

  const eliminar = async (id) => {
    if (window.confirm('¿Desea eliminar este registro?')) {
      const result = await eliminarRegistro(id)
      listar()
    }

  }

  useEffect(() => {
    listar()
  }, [])

  return (
    <div className="container">
      <h1>MonederoApp</h1>
      <div className='row'>
        <div className='col-md-4'>
          <h3 className=''>Nuevo</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='tipoInput' className='form-label'>Tipo</label>
              <select onChange={handleChange} className='form-select' id="tipoInput" name='typeRegister' value={datos.typeRegister} required>
                <option value="">Selecciona una opción</option>
                <option value="E">Entrada</option>
                <option value="S">Salida</option>

              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="descripcionInput" className="form-label">Descripción</label>
              <input onChange={handleChange} type="text" className="form-control" name="description" id="descripcionInput" value={datos.descripcionInput} required />
            </div>
            <div className="mb-3">
              <label htmlFor="montoInput" className="form-label">Monto</label>
              <input onChange={handleChange} type="text" className="form-control" name="amount" id="montoInput" value={datos.amount} />
            </div>
            <div className="mb-3">
              <button type="submit" className='btn btn-primary'>Guardar</button>
            </div>
          </form>
        </div>

        <div className='col-md-8'>
          <h3>Lista de registro</h3>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Tipo</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                lista.map((x) => (
                  <tr key={x._id}>
                    <td>{x.description}</td>
                    <td>{x.amount}</td>
                    <td>{x.typeRegister}</td>
                    <td>{x.dateCreation}</td>
                    <td>
                      <button className="btn btn-info me-1">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button onClick={()=>eliminar(x._id)} className="btn btn-danger">
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
