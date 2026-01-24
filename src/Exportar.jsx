import { useRef } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";

const Exportar = ({
  usuario,
  paisInicial,
  bancoBob,
  bancoArs,
  monto,
  comisionVisible,
  cotizacionBinanceCompra,
  cotizacionDescuento,
  recibe,
  total,
}) => {
  const tableRef = useRef(null);

  const exportToImage = () => {
    html2canvas(tableRef.current, {
      scale: 3,
      backgroundColor: "#011b36",
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Cotizacion.png";
      link.click();
    });
  };

  /* ========= ESTILOS ========= */

  const cardStyle = {
    backgroundColor: "#0f315e",
    border: "2px solid #1c4780",
    borderRadius: "18px",
    padding: "20px",
  };

  const title = {
    color: "#ffffff",
    fontSize: "20px",
    margin: 0,
  };

  const big = {
    color: "#ffffff",
    fontSize: "40px",
    fontWeight: "bold",
  };

  const gray = {
    color: "#bbbbbb",
    fontSize: "14px",
  };

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
        {/* ===== CARD SUPERIOR ===== */}
        <div style={cardStyle}>
          <h3 style={title}>Quiero transferir</h3>

          <div style={big}>
            {new Intl.NumberFormat("es-ES").format(monto)}{" "}
            {paisInicial === "Bolivia" ? "Bs" : "ARS"}
          </div>

          <p style={gray}>
            Recibe en {paisInicial === "Bolivia" ? "ARGENTINA" : "BOLIVIA"}:{" "}
            {recibe} {paisInicial === "Bolivia" ? "ARS" : "Bs"}
          </p>

          {/* Tipos de cambio en una sola línea */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span style={gray}>
              {cotizacionBinanceCompra} Bs/USD
            </span>
            <span style={gray}>
              {cotizacionDescuento} ARS/USD
            </span>
          </div>
        </div>

        {/* ===== LOGO CENTRAL ===== */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "3px solid #1c4780",
            backgroundColor: "#011b36",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px auto",
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}Logo.png`}
            alt="Econotransfer"
            style={{
              width: "80px",
              transform: "rotate(-90deg)",
            }}
          />
        </div>

        {/* ===== CARD INFERIOR ===== */}
        <div style={cardStyle}>
          <h3 style={title}>Total a pagar</h3>

          <div style={big}>
            {total} {paisInicial === "Bolivia" ? "Bs" : "ARS"}
          </div>

          <p style={gray}>Comisión incluida: {comisionVisible}%</p>
        </div>

        {/* ===== BANCOS (SIN RECTÁNGULO) ===== */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          {usuario === "Zeggers" ? (
            paisInicial === "Bolivia" ? (
              bancoBob === "Banco Ganadero" ? (
                <img
                  src={`${import.meta.env.BASE_URL}Zegers Banco Ganadero.jpg`}
                  width={260}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}Zegers Yape.jpg`}
                  width={260}
                />
              )
            ) : bancoArs === "Mercado Pago" ? (
              <p>
                SANTIAGO ZEGERS BRIANCON<br />
                DNI: 96081178<br />
                Alias: szegersb<br />
                CBU: 0000003100068509876137
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
                <img
                  src={`${import.meta.env.BASE_URL}Nacho Banco Ganadero.jpg`}
                  width={260}
                />
              ) : bancoBob === "Banco BCP" ? (
                <img
                  src={`${import.meta.env.BASE_URL}Nacho Banco BCP.jpg`}
                  width={260}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}Nacho Banco Mercantil.jpg`}
                  width={260}
                />
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

        <p
          style={{
            fontSize: "12px",
            color: "#bbbbbb",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Al realizar el pago, está aceptando nuestros términos y condiciones.
        </p>
      </div>
    </div>
  );
};

Exportar.propTypes = {
  usuario: PropTypes.string.isRequired,
  paisInicial: PropTypes.string.isRequired,
  bancoBob: PropTypes.string.isRequired,
  bancoArs: PropTypes.string.isRequired,
  monto: PropTypes.number.isRequired,
  comisionVisible: PropTypes.number.isRequired,
  cotizacionBinanceCompra: PropTypes.number.isRequired,
  cotizacionDescuento: PropTypes.number.isRequired,
  recibe: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Exportar;
