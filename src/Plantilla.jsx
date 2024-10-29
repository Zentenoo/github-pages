import { useEffect, useState } from 'react'

export const Plantilla = () => {
    const [usuario, setUsuario] = useState('');
    const [moneda, setMoneda] = useState('');
    const [cambios, setCambios] = useState('');


    return (
        <div>
            <h1>Plantilla</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <select name="usuario" id="usuario" onChange={(e) => setUsuario(e.target.value)}>
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
            </div>
            <div style={{ border: '1px solid white', padding: '10px', margin: '10px', borderRadius: '10px' }}>
                <h2>Usuario que hace la venta: {usuario}</h2>
                <h2>Se cambiarán {moneda} a {cambios}</h2>
                {/* <h2>Se cambiarán {moneda} a {cambios}</h2> */}
            </div>
        </div>
    );
};