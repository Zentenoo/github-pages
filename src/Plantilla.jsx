import { useEffect, useState } from 'react'
import { cargarCompraArs, cargarCompraBob, cargarVentaArs, cargarVentaBob } from './useCargarDatosBinance'

export const Plantilla = () => {
    const [usuario, setUsuario] = useState('');
    const [paisDestino, setPaisDestino] = useState('');
    const [cambios, setCambios] = useState('');
    const [bancoBob, setBancoBob] = useState('');
    const [bancoArs, setBancoArs] = useState('');
    const [monto, setMonto] = useState('');
    const [dataCompraBob, setDataCompraBob] = useState([])
    const [dataVentaBob, setDataVentaBob] = useState([])
    const [dataArs, setDataArs] = useState([])
    const [dataCompraArs, setDataCompraArs] = useState([])

    const [cotizacionBinance, setCotizacionBinance] = useState([])


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
    const [cotizacion, setCotizacion] = useState(0);
    console.log(bancoArs);
    console.log(bancoBob);

    console.log({ cotizacionBinance });



    const Calcular = () => {
        let calculo = 0;
        calculo=cotizacionBinance-(cotizacionBinance*6/100)
        calculo=calculo*parseFloat(monto.replace(',', '.'));
        console.log(calculo);
        
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
                    <h4>PaisDestino que se cotizará</h4>
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
                            value="USD"
                            checked={cambios === 'USD'}
                            onChange={(e) => setCambios(e.target.value)}
                        />
                        USD
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
                        <select defaultValue={0} onChange={(e) => setCotizacionBinance(e.target.value)}>
                            <option value='0' disabled>Selecciona un monto:</option>
                            {dataCompraArs.length > 0 ?
                                (
                                    dataCompraArs.map((item, index) => (
                                        <option key={index} value={item}>[{index+1}]Ars - {item}</option>
                                    ))
                                ) : (<></>)
                            }
                        </select>
                    ) : (<></>)}

                </div>
                <div>
                    <h4>Monto</h4>
                    <input
                        type="string"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                </div>

                <button onClick={Calcular}>
                    Calcular
                </button>
            </div>
            <div style={{ border: '1px solid white', padding: '10px', margin: '10px', borderRadius: '10px' }}>
                <h2>Usuario que hace la venta: {usuario}</h2>
                <h2>Se cambiarán: {paisDestino} a {cambios}</h2>
                <h2>El banco será: {paisDestino === "Bolivia" ? bancoBob : bancoArs}</h2>
                <h2>El monto es: {monto}</h2>
                <h2>La cotización en Binance es: {cotizacionBinance}</h2>
            </div>
        </div>
    );
};