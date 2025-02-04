import { useEffect, useState } from 'react'
import { cargarCompraArs, cargarCompraBob, cargarVentaArs, cargarVentaBob } from './useCargarDatosBinance'
import Exportar from './Exportar'

export const Plantilla = () => {
    const [usuario, setUsuario] = useState('');
    const [paisDestino, setPaisDestino] = useState('');
    const [cambios, setCambios] = useState('');
    const [bancoBob, setBancoBob] = useState('');
    const [bancoArs, setBancoArs] = useState('');
    const [monto, setMonto] = useState('');
    const [dataCompraBob, setDataCompraBob] = useState([])
    const [dataVentaBob, setDataVentaBob] = useState([])
    const [dataVentaArs, setDataVentaArs] = useState([])
    const [dataCompraArs, setDataCompraArs] = useState([])
    const [cotizacionDescuento, setCotizacionDescuento] = useState(0)
    const [recibe, setRecibe] = useState(0)
    const [comision, setComision] = useState(6)
    const [paganSinComision, setPaganSinComision] = useState(0)
    const [paganConComision, setPaganConComision] = useState(0)
    const [total, setTotal] = useState(0)


    const [cotizacionBinanceVenta, setCotizacionBinanceVenta] = useState([])
    const [cotizacionBinanceCompra, setCotizacionBinanceCompra] = useState([])


    useEffect(() => {
        const cargarData = async () => {
            const compraBob = await cargarCompraBob();
            const ventaBob = await cargarVentaBob();
            const ventaArs = await cargarVentaArs();
            const compraArs = await cargarCompraArs();

            setDataCompraBob(compraBob);
            setDataVentaBob(ventaBob);
            setDataVentaArs(ventaArs);
            setDataCompraArs(compraArs);
        };

        cargarData();
    }, [])

    useEffect(() => {
        if (dataVentaArs.length > 0) {
            setCotizacionBinanceVenta(dataVentaArs[9] || dataVentaArs[0]);
        }
    }, [dataVentaArs]);

    useEffect(() => {
        if (dataCompraBob.length > 0) {
            setCotizacionBinanceCompra(dataCompraBob[9] || dataCompraBob[0]);
        }
    }, [dataCompraBob]);
    // const [cotizacion, setCotizacion] = useState(0);
    // console.log(bancoArs);
    // console.log(bancoBob);

    // console.log({ cotizacionBinanceVenta });



    const Calcular = () => {
        let calculoRecibe = 0;
        let calculoPaga1 = 0;
        let calculoPaga2 = 0;

        calculoRecibe = cotizacionBinanceVenta - ((cotizacionBinanceVenta * comision) / 100)
        console.log(calculoRecibe);

        let formatoNumeroDescuento = new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(calculoRecibe);
        setCotizacionDescuento(formatoNumeroDescuento);
        calculoRecibe = monto * calculoRecibe;
        let formatoNumero = new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(calculoRecibe);
        setRecibe(formatoNumero);

        calculoPaga1 = monto * cotizacionBinanceCompra;
        let formatoSinComision = new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(calculoPaga1);
        setPaganSinComision(formatoSinComision);

        calculoPaga2 = calculoPaga1 / 100
        let formatoConComision = new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(calculoPaga2);
        setPaganConComision(formatoConComision);

        calculoPaga2 = calculoPaga1 + calculoPaga2
        let formatoTotal = new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(calculoPaga2);
        console.log(calculoPaga2);
        setTotal(formatoTotal)

    }

    return (
        <div>
            <h1>Plantilla</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <select name="usuario" id="usuario" onChange={(e) => { setUsuario(e.target.value); setBancoArs(''); setBancoBob('') }} defaultValue={''}>
                    <option value="" disabled >Selecciona un usuario</option>
                    <option value="Zeggers">Zeggers</option>
                    <option value="Nacho">Nacho</option>
                </select>
                <div>
                    <h4>País de Destino</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Bolivia"
                            checked={paisDestino === 'Bolivia'}
                            onChange={(e) => setPaisDestino(e.target.value)}
                        />
                        Bolivia
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Argentina"
                            checked={paisDestino === 'Argentina'}
                            onChange={(e) => setPaisDestino(e.target.value)}
                        />
                        Argentina
                    </label>
                </div>
                {paisDestino ? <div>
                    <h4>CASO</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="USD"
                            checked={cambios === 'USD'}
                            onChange={(e) => setCambios(e.target.value)}
                        />
                        USD
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="ARS"
                            checked={cambios === 'ARS'}
                            disabled={paisDestino === 'Argentina'}
                            onChange={(e) => setCambios(e.target.value)}
                        />
                        ARS
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="BOB"
                            checked={cambios === 'BOB'}
                            onChange={(e) => setCambios(e.target.value)}
                            disabled={paisDestino === 'Bolivia'}
                        />
                        BOB
                    </label>
                </div> : <></>}
                {usuario == "Zeggers" && paisDestino == "Bolivia" ? <div>
                    <h4>Banco Boliviano que figurará la cotización</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Ganadero"
                            checked={bancoBob === 'Banco Ganadero'}
                            onChange={(e) => setBancoBob(e.target.value)}
                        />
                        Banco Ganadero
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Credito"
                            checked={bancoBob === 'Banco Credito'}
                            onChange={(e) => setBancoBob(e.target.value)}
                        />
                        Banco Credito
                    </label>
                </div> : <></>}
                {usuario == "Zeggers" && paisDestino == "Argentina" ? <div>
                    <h4>Banco Argentino que figurará la cotización</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Mercado Pago"
                            checked={bancoArs === 'Mercado Pago'}
                            onChange={(e) => setBancoArs(e.target.value)}
                        />
                        Mercado Pago
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="banco lemon"
                            checked={bancoArs === 'banco lemon'}
                            onChange={(e) => setBancoArs(e.target.value)}
                        />
                        Banco Lemon
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Ualá"
                            checked={bancoArs === 'Banco Ualá'}
                            onChange={(e) => setBancoArs(e.target.value)}
                        />
                        Banco Ualá
                    </label>
                </div> : <></>}
                {usuario == "Nacho" && paisDestino == "Bolivia" ? <div>
                    <h4>Banco Boliviano que figurará la cotización</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Ganadero"
                            checked={bancoBob === 'Banco Ganadero'}
                            onChange={(e) => setBancoBob(e.target.value)}
                        />
                        Banco Ganadero
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Bisa"
                            checked={bancoBob === 'Banco Bisa'}
                            onChange={(e) => setBancoBob(e.target.value)}
                        />
                        Banco Bisa
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Nacional"
                            checked={bancoBob === 'Banco Nacional'}
                            onChange={(e) => setBancoBob(e.target.value)}
                        />
                        Banco Nacional
                    </label>
                </div> : <></>}
                {usuario == "Nacho" && paisDestino == "Argentina" ? <div>
                    <h4>Banco Argentino que figurará la cotización</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Mercado Pago"
                            checked={bancoArs === 'Mercado Pago'}
                            onChange={(e) => setBancoArs(e.target.value)}
                        />
                        Mercado Pago
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="Banco Ualá"
                            checked={bancoArs === 'Banco Ualá'}
                            onChange={(e) => setBancoArs(e.target.value)}
                        />
                        Banco Ualá
                    </label>
                </div> : <></>}
                <div>
                    <h4>Cotización Binance</h4>
                    {cambios == "USD" && paisDestino == "Argentina" ? (
                        <select defaultValue={10} onChange={(e) => setCotizacionBinanceVenta(e.target.value)}>
                            <option value='0' disabled>Selecciona un monto:</option>
                            {dataCompraArs.length > 0 ?
                                (
                                    dataCompraArs.map((item, index) => (
                                        <option key={index} value={item}>[{index + 1}]Ars - {item}</option>
                                    ))
                                ) : (<>ola</>)
                            }
                        </select>
                    ) : (<></>)}
                    {cambios == "USD" && paisDestino == "Bolivia" ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <select defaultValue={10} onChange={(e) => setCotizacionBinanceVenta(e.target.value)}>
                                <option value='0' disabled>Selecciona un monto:</option>
                                {dataVentaArs.length > 0 ?
                                    (
                                        dataVentaArs.slice().reverse().map((item, index) => (
                                            <option key={index} value={item}>[{dataVentaArs.length - index}] Ars - {item}</option>
                                        ))
                                    ) : (<>ola</>)
                                }
                            </select>
                            <select defaultValue={10} onChange={(e) => setCotizacionBinanceCompra(e.target.value)}>
                                <option value='0' disabled>Selecciona un monto:</option>
                                {dataCompraBob.length > 0 ?
                                    (
                                        dataCompraBob.slice().reverse().map((item, index) => (
                                            <option key={index} value={item}>[{dataCompraBob.length - index}] Bob - {item}</option>
                                        ))
                                    ) : (<>ola</>)
                                }
                            </select>
                        </div>
                    ) : (<></>)}

                </div>
                <div onWheel={(e) => e.target.blur()}>
                    <h4>Monto</h4>
                    <input
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                </div>

                <button onClick={Calcular}>
                    Calcular
                </button>
                <div onWheel={(e) => e.target.blur()} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="comision">Comision</label>
                    <input id='comision' type="number" value={comision} onChange={(e) => setComision(e.target.value)}></input>
                </div>

            </div>
            <div style={{ border: '1px solid white', padding: '10px', margin: '10px', borderRadius: '10px' }}>
                <h2>Usuario que hace la venta: {usuario}</h2>
                <h2>Se cambiarán: {paisDestino} a {cambios}</h2>
                <h2>El banco será: {paisDestino === "Bolivia" ? bancoBob : bancoArs}</h2>
                <h2>El monto es: {monto}</h2>
                <h2>La cotización en Binance Venta es: {cotizacionBinanceVenta}</h2>
                <h2>La cotizacion de Binance Compra es: {cotizacionBinanceCompra}</h2>
                <h2>La cotizacion de Binance con descuento es: {cotizacionDescuento}</h2>
                <h2>Recibe esto con el {comision}%: {recibe}</h2>
                <h2>Monto sin Comisión: {paganSinComision} </h2>
                <h2>Monto con Comisión: {paganConComision} </h2>
                <h2>Monto Total: {total} </h2>
                <h2>La comision es: {comision}</h2>
            </div>
            <Exportar 
                usuario={usuario}
                bancoBob={bancoBob}
                bancoArs={bancoArs}
                paisDestino={paisDestino} 
                cambios={cambios} 
                monto={monto} 
                cotizacionBinanceCompra={cotizacionBinanceCompra}
                cotizacionBinanceVenta={cotizacionBinanceVenta}
                cotizacionDescuento={cotizacionDescuento}
                recibe={recibe}
                paganSinComision={paganSinComision}
                paganConComision={paganConComision}
                total={total}
            />
        </div>
    );
};