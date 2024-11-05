import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Plantilla } from './Plantilla'
import { cargarCompraArs, cargarCompraBob, cargarVentaArs, cargarVentaBob } from './useCargarDatosBinance'

function App() {
  const [dataCompraBob, setDataCompraBob] = useState([])
  const [dataVentaBob, setDataVentaBob] = useState([])
  const [dataArs, setDataArs] = useState([])
  const [dataCompraArs, setDataCompraArs] = useState([])


  useEffect(() => {
    const cargarData = async () => {
      const compraBob = await cargarCompraBob();
      const ventaBob = await cargarVentaBob();
      const ventaArs = await cargarVentaArs();
      const compraArs = await cargarCompraArs();

      setDataCompraBob(compraBob);     
      setDataVentaBob(ventaBob);
      setDataArs(ventaArs);
      setDataCompraArs(compraArs);
    };

    cargarData();
  }, [])

  return (
    <>
      <h1 className="read-the-docs">
        EconoTransfer
      </h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="data-section">
            <h2>Datos de Compra Bob </h2>
            {dataCompraBob.length === 0 && <p>No hay datos disponibles</p>}
            <ul>
              {dataCompraBob.map((item, index) => (
                <li key={index}>
                  {`Precio: ${item}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="data-section">
            <h2>Datos de Venta Bob</h2>
            {dataVentaBob.length === 0 && <p>No hay datos disponibles</p>}
            <ul>
              {dataVentaBob.map((item, index) => (
                <li key={index}> Precio: {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="data-section">
            <h2>Datos de Venta Ars</h2>
            {dataArs.length === 0 && <p>No hay datos disponibles</p>}
            <ul>
              {dataArs.map((item, index) => (
                <li key={index}> Precio: {item}</li>
              ))}
            </ul>
          </div>
          <div className="data-section">
            <h2>Datos de Compra Ars</h2>
            {dataCompraArs.length === 0 && <p>No hay datos disponibles</p>}
            <ul>
              {dataCompraArs.map((item, index) => (
                <li key={index}> Precio: {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Plantilla />
      </div>
    </>
  )
}

export default App
