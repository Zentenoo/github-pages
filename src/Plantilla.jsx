export default Plantilla = () => {
    const [usuario, setUsuario] = useState('');
    const [moneda, setMoneda] = useState('');
    const [cambios, setCambios] = useState('');

    

    return (
        <div>
            <h1>Plantilla</h1>
            <select name="usuario" id="usuario" onChange={(e) => setUsuario(e.target.value)}>
                <option value="Z">Zeggers</option>
                <option value="N">Nacho</option>
            </select>


            <div>
                <h2>Usuario que hace la venta: {usuario}</h2>
            </div>
        </div>
    );
};