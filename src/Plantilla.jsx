import { useEffect, useState } from 'react'

export const Plantilla = () => {
    const [usuario, setUsuario] = useState('');
    const [moneda, setMoneda] = useState('');
    const [cambios, setCambios] = useState('');
    const [bancoBob, setBancoBob] = useState('');
    const [bancoArs, setBancoArs] = useState('');

    console.log(bancoArs);
    console.log(bancoBob);
    
    
    return (
        <div>
            <h1>Plantilla</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <select name="usuario" id="usuario" onChange={(e) => {setUsuario(e.target.value);setBancoArs('');setBancoBob('')}} defaultValue={''}>
                    <option value="" disabled >Selecciona un usuario</option>
                    <option value="Zeggers">Zeggers</option>
                    <option value="Nacho">Nacho</option>
                </select>
                <div>
                    <h4>Moneda que se va a cambiar</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="BOB"
                            checked={moneda === 'BOB'}
                            onChange={(e) => setMoneda(e.target.value)}
                        />
                        BOB
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="ARS"
                            checked={moneda === 'ARS'}
                            onChange={(e) => setMoneda(e.target.value)}
                        />
                        ARS
                    </label>
                </div>
                {moneda ? <div>
                    <h4>Moneda a la que quieres cambiar</h4>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="BOB"
                            checked={cambios === 'BOB'}
                            onChange={(e) => setCambios(e.target.value)}
                            disabled={moneda === 'BOB'}
                        />
                        BOB
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value="ARS"
                            checked={cambios === 'ARS'}
                            disabled={moneda === 'ARS'}
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
                {usuario == "Zeggers" && moneda == "BOB" ? <div>
                    <h4>Banco Boliviano que quieres depositar</h4>
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
                {usuario == "Zeggers" && moneda == "ARS"  ?  <div>
                    <h4>Banco Argentino que quieres depositar</h4>
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
                {usuario == "Nacho" && moneda == "BOB" ? <div>
                    <h4>Banco Boliviano que quieres depositar</h4>
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
                {usuario == "Nacho" && moneda == "ARS"  ?  <div>
                    <h4>Banco Argentino que quieres depositar</h4>
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
            </div>
            <div style={{ border: '1px solid white', padding: '10px', margin: '10px', borderRadius: '10px' }}>
                <h2>Usuario que hace la venta: {usuario}</h2>
                <h2>Se cambiarán: {moneda} a {cambios}</h2>
                <h2>El banco será: {moneda=== "BOB" ? bancoBob : bancoArs}</h2>
            </div>
        </div>
    );
};