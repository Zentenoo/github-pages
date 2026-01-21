import { useRef } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";

const Exportar = ({
  usuario,
  paisInicial,
  cambios,
  bancoBob,
  bancoArs,
  monto,
  comisionVisible,
  cotizacionBinanceCompra,
  cotizacionBinanceVenta,
  cotizacionDescuento,
  recibe,
  paganSinComision,
  paganConComision,
  total
}) => {

  const tableRef = useRef(null);
  const fecha = new Date().toLocaleDateString();

  const generarCodigo = () => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const monthAbbr = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
    const year = date.getFullYear().toString().slice(-3);
    return `${randomNumbers}${monthAbbr}${year}`;
  };

  const codigo = generarCodigo();

  const exportToImage = () => {
    html2canvas(tableRef.current, {
      scale: 3,
      backgroundColor: "#011b36",
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `Cotizacion_${codigo}.png`;
      link.click();
    });
  };

  /* ================= ESTILOS ================= */

  const cardStyle = {
    backgroundColor: "#0f315e",
    border: "2px solid #1c4780",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "20px",
  };

  const title = { color: "#ffffff", margin: 0, fontSize: "20px" };
  const bigNumber = { color: "#ffffff", fontSize: "42px", fontWeight: "bold" };
  const smallText = { color: "#bbbbbb", fontSize: "14px" };

  return (
    <div>
      <button onClick={exportToImage}>Exportar como Imagen</button>

      <div
        ref={tableRef}
        style={{
          backgroundColor: "#011b36",
          padding: "30px",
          width: "800px",
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >

        {/* CARD SUPERIOR */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={title}>Quiero transferir</h3>
              <div style={bigNumber}>
                {new Intl.NumberFormat("es-ES").format(monto)}{" "}
                {paisInicial === "Bolivia" ? "Bs" : "ARS"}
              </div>
              <div style={smallText}>
                Tipos de cambio:
                <br />
                {cotizacionBinanceCompra} Bs/USD
                <br />
                {cotizacionDescuento} ARS/USD
              </div>
            </div>

            <img
              src={
                paisInicial === "Bolivia"
                  ? `${import.meta.env.BASE_URL}argentina.png`
                  : `${import.meta.env.BASE_URL}bolivia.png`
              }
              alt="Bandera destino"
              style={{ width: "60px" }}
            />
          </div>
        </div>

        {/* CARD TOTAL */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={title}>Total a pagar</h3>
              <div style={bigNumber}>
                {total} {paisInicial === "Bolivia" ? "Bs" : "ARS"}
              </div>
              <div style={smallText}>
                Comisión incluida: {comisionVisible}%
              </div>
            </div>

            <img
              src={
                paisInicial === "Bolivia"
                  ? `${import.meta.env.BASE_URL}bolivia.png`
                  : `${import.meta.env.BASE_URL}argentina.png`
              }
              alt="Bandera origen"
              style={{ width: "60px" }}
            />
          </div>
        </div>

        {/* CARD BANCOS */}
        <div style={cardStyle}>
          <h3 style={title}>Depositar a esta cuenta bancaria</h3>

          <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            <div style={{ textAlign: "center" }}>

              {usuario === "Zeggers" ? (
                paisInicial === "Bolivia" ? (
                  bancoBob === "Banco Ganadero" ? (
                    <>
                      <h4>USA ESTE QR:</h4>
                      <img src={`${import.meta.env.BASE_URL}Zegers Banco Ganadero.jpg`} width={250} />
                    </>
                  ) : (
                    <>
                      <h4>USA ESTE QR:</h4>
                      <img src={`${import.meta.env.BASE_URL}Zegers Yape.jpg`} width={250} />
                    </>
                  )
                ) : bancoArs === "Mercado Pago" ? (
                  <p>
                    SANTIAGO ZEGERS BRIANCON<br />
                    DNI: 96081178<br />
                    Alias: szegersb<br />
                    CBU: 0000003100068509876137<br />
                    Mercado Pago
                  </p>
                ) : bancoArs === "Banco Ualá" ? (
                  <p>
                    SANTIAGO ZEGERS BRIANCON<br />
                    DNI: 96081178<br />
                    Alias: zegerssantiagob.uala<br />
                    CBU: 0000007900209608117808
                  </p>
                ) : bancoArs === "banco lemon" ? (
                  <p>
                    SANTIAGO ZEGERS BRIANCON<br />
                    DNI: 96081178<br />
                    Alias: zegers.LEMON<br />
                    CBU: 0000168300000002946041
                  </p>
                ) : bancoArs === "Banco Brubank" ? (
                  <p>
                    SANTIAGO ZEGERS BRIANCON<br />
                    DNI: 96081178<br />
                    Alias: santiagozegers<br />
                    CBU: 1430001713040034310010
                  </p>
                ) : (
                  <p>
                    SANTIAGO ZEGERS BRIANCON<br />
                    DNI: 96081178<br />
                    Alias: ACUDIERA.NUCA.ABEDUL
                  </p>
                )
              ) : usuario === "Nacho" ? (
                paisInicial === "Bolivia" ? (
                  bancoBob === "Banco Ganadero" ? (
                    <img src={`${import.meta.env.BASE_URL}Nacho Banco Ganadero.jpg`} width={250} />
                  ) : bancoBob === "Banco BCP" ? (
                    <img src={`${import.meta.env.BASE_URL}Nacho Banco BCP.jpg`} width={250} />
                  ) : (
                    <img src={`${import.meta.env.BASE_URL}Nacho Banco Mercantil.jpg`} width={250} />
                  )
                ) : bancoArs === "Mercado Pago" ? (
                  <p>
                    IGNACIO BLUSKE BRIANCON<br />
                    DNI: 51702821<br />
                    Alias: Ignacioblusk5
                  </p>
                ) : bancoArs === "Banco Ualá" ? (
                  <p>
                    IGNACIO BLUSKE BRIANCON<br />
                    DNI: 51702821<br />
                    Alias: ibluskeb.uala<br />
                    CBU: 0000007900205170282162
                  </p>
                ) : (
                  <p>
                    IGNACIO BLUSKE BRIANCON<br />
                    DNI: 51702821<br />
                    Alias: ibluskeb.lemon<br />
                    CBU: 0000168300000015980139
                  </p>
                )
              ) : (
                <p>Nada</p>
              )}

            </div>

            <img
              src={`${import.meta.env.BASE_URL}Logo.png`}
              alt="Logo"
              width={250}
            />
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#bbbbbb", textAlign: "center" }}>
          Al realizar el pago, está aceptando nuestros términos y condiciones.
        </p>
      </div>
    </div>
  );
};

Exportar.propTypes = {
  usuario: PropTypes.string.isRequired,
  paisInicial: PropTypes.string.isRequired,
  cambios: PropTypes.string.isRequired,
  bancoBob: PropTypes.string.isRequired,
  bancoArs: PropTypes.string.isRequired,
  monto: PropTypes.string.isRequired,
  comisionVisible: PropTypes.number.isRequired,
  cotizacionBinanceCompra: PropTypes.string.isRequired,
  cotizacionBinanceVenta: PropTypes.string.isRequired,
  cotizacionDescuento: PropTypes.number.isRequired,
  recibe: PropTypes.number.isRequired,
  paganSinComision: PropTypes.number.isRequired,
  paganConComision: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Exportar;
