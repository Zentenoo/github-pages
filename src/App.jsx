import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Plantilla } from './Plantilla'

function App() {
  const [dataCompraBob, setDataCompraBob] = useState([])
  const [dataVentaBob, setDataVentaBob] = useState([])
  const [dataArs, setDataArs] = useState([])
  const [dataCompraArs, setDataCompraArs] = useState([])


  useEffect(() => {
    const cargarCompraBob = async () => {
      try {
        const responseBob = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
          "fiat": "BOB",
          "page": 1,
          "rows": 10,
          "tradeType": "BUY",
          "asset": "USDT",
          "countries": [],
          "proMerchantAds": false,
          "shieldMerchantAds": false,
          "filterType": "all",
          "periods": [],
          "additionalKycVerifyFilter": 0,
          "publisherType": null,
          "payTypes": [],
          "classifies": ["mass", "profession", "fiat_trade"]
        });
        const prices = responseBob.data.data.map((item) => item.adv.price);

        setDataCompraBob(prices);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    const cargarVentaBob = async () => {
      try {
        const responseVentaBob = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
          "fiat": "BOB",
          "page": 1,
          "rows": 10,
          "tradeType": "SELL",
          "asset": "USDT",
          "countries": [],
          "proMerchantAds": false,
          "shieldMerchantAds": false,
          "filterType": "all",
          "periods": [],
          "additionalKycVerifyFilter": 0,
          "publisherType": null,
          "payTypes": [],
          "classifies": ["mass", "profession", "fiat_trade"]
        });
        const prices = responseVentaBob.data.data.map((item) => item.adv.price);

        setDataVentaBob(prices);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    const cargarVentaArs = async () => {
      try {
        const responseArs = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
          "fiat": "ARS",
          "page": 1,
          "rows": 10,
          "tradeType": "SELL",
          "asset": "USDT",
          "countries": [],
          "proMerchantAds": false,
          "shieldMerchantAds": false,
          "filterType": "all",
          "periods": [],
          "additionalKycVerifyFilter": 0,
          "publisherType": "merchant",
          "payTypes": [],
          "classifies": ["mass", "profession", "fiat_trade"]
        });
        const pricesArs = responseArs.data.data.map((item) => item.adv.price);

        setDataArs(pricesArs);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    const cargarCompraArs = async () => {
      try {
        const responseCompraArs = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
          "fiat": "ARS",
          "page": 1,
          "rows": 10,
          "tradeType": "BUY",
          "asset": "USDT",
          "countries": [],
          "proMerchantAds": false,
          "shieldMerchantAds": false,
          "filterType": "all",
          "periods": [],
          "additionalKycVerifyFilter": 0,
          "publisherType": "merchant",
          "payTypes": [],
          "classifies": [
            "mass",
            "profession",
            "fiat_trade"
          ]
        });
        const pricesCompraArs = responseCompraArs.data.data.map((item) => item.adv.price);

        setDataCompraArs(pricesCompraArs);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    cargarVentaArs()
    cargarCompraArs()
    cargarCompraBob()
    cargarVentaBob()
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
