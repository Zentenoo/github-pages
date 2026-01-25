import { useRef, useMemo } from "react";
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
  total,
}) => {
  const tableRef = useRef(null);

  ///////////////////Métodos utiles para formatear y reescrbir numeros////////////////////////

  const toNumber = (v) => {
    if (typeof v === "number") return v;
    if (typeof v !== "string") return 0;

    const s = v.trim();

    // Caso 1: decimal con punto → "9.56"
    if (/^\d+\.\d+$/.test(s)) {
      const n = Number(s);
      return Number.isFinite(n) ? n : 0;
    }

    // Caso 2: decimal con coma → "9,56"
    if (/^\d+,\d+$/.test(s)) {
      const n = Number(s.replace(",", "."));
      return Number.isFinite(n) ? n : 0;
    }

    // Caso 3: entero → "1000"
    if (/^\d+$/.test(s)) {
      return Number(s);
    }

    // Caso 4: formato ES completo → "1.234,56"
    const normalized = s.replace(/\./g, "").replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  };


  const fmt0 = (n) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n);
  const fmt2 = (n) =>
    new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  ////////////Exportar la imagen/////////////////

  const exportToImage = () => {
    if (!tableRef.current) return;

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

  // ====== Datos de destino/origen para etiquetas ======
  const destinoNombre = paisInicial === "Bolivia" ? "ARGENTINA" : "BOLIVIA";
  const monedaDestino = paisInicial === "Bolivia" ? "Ars" : "Bs";
  const monedaPago = paisInicial === "Bolivia" ? "Bs" : "Ars";

  // Top: monto que recibe (destino)
  const recibeN = useMemo(() => toNumber(recibe), [recibe]);
  // Bottom: total a pagar (origen)
  const totalN = useMemo(() => toNumber(total), [total]);

  // Comisión (monto que mostrás a la derecha)
  // En tu lógica original, paganConComision es el número que ponías en la fila de comisión.
  // Lo normalizo para evitar NaN.
  const comisionMontoN = useMemo(() => toNumber(paganConComision), [paganConComision]);

  // Tipos de cambio
  const tcBsUsd = useMemo(() => toNumber(cotizacionBinanceCompra), [cotizacionBinanceCompra]);
  const tcArsUsd = useMemo(() => toNumber(cotizacionDescuento), [cotizacionDescuento]);

  /* ================= ESTILOS ================= */

  const cardStyle = {
  backgroundColor: "#0f315e",
  border: "2px solid #1c4780",
  borderRadius: "22px",
  padding: "26px 28px",
  height: "230px",
  };

  const titleLeft = {
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
    textAlign: "left",
  };

  const bigLeft = {
    color: "#ffffff",
    fontSize: "56px",
    fontWeight: 800,
    margin: "10px 0 0 0",
    textAlign: "left",
    letterSpacing: "0.5px",
  };

  const smallGray = {
    color: "#bbbbbb",
    fontSize: "16px",
    marginTop: "5px",
    textAlign: "left",
  };

  const rateRow = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    color: "#bbbbbb",
    fontSize: "16px",
  };

  return (
    <div>
      <button onClick={exportToImage}>Exportar como Imagen</button>

      <div
        ref={tableRef}
        style={{
          backgroundColor: "#011b36",
          padding: "40px",
          width: "820px",
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* ========= BLOQUE SOLO DE LOS DOS RECTÁNGULOS (para posicionar bien el logo) ========= */}
        <div style={{ position: "relative" }}>
          {/* ======= CARD 1: MONTO QUE RECIBE ======= */}
          <div style={{ ...cardStyle, position: "relative" }}>
            {/* Bandera derecha (destino) */}
            <img
              src={
                paisInicial === "Bolivia"
                  ? `${import.meta.env.BASE_URL}argentina.png`
                  : `${import.meta.env.BASE_URL}bolivia.png`
              }
              alt="Bandera destino"
              style={{
                position: "absolute",
                right: "28px",
                top: "28px",
                width: "98px",
                height: "82px",
                borderRadius: "4px",
              }}
            />

            <div style={titleLeft}>Monto que recibe</div>

            <div style={bigLeft}>
              {fmt2(recibeN)} {monedaDestino}
            </div>

            {/* Tipos de cambio (como referencia: label + 2 valores en la misma línea) */}
            <div style={smallGray}>Tipos de cambio</div>
            <div style={rateRow}>
              <span>{fmt2(tcBsUsd)} Bs/USD</span>
              <span>{fmt2(tcArsUsd)} ARS/USD</span>
            </div>
          </div>

          {/* ===== LOGO SUPERPUESTO ENTRE RECTÁNGULOS ===== */}
          <div
            style={{
              width: "135px",
              height: "135px",
              borderRadius: "50%",
              backgroundColor: "#011b36",
              border: "3px solid #1c4780",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {/* TAPÓN IZQUIERDO */}
            <div
              style={{
                position: "absolute",
                left: "-12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "14px",
                height: "34px",
                backgroundColor: "#011b36",
              }}
            />

            {/* TAPÓN DERECHO */}
            <div
              style={{
                position: "absolute",
                right: "-12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "14px",
                height: "34px",
                backgroundColor: "#011b36",
              }}
            />

            {/* LOGO */}
            <img
              src={`${import.meta.env.BASE_URL}logo_sin_letras.png`}
              alt="Econotransfer"
              style={{
                width: "125px",
                transform: "rotate(90deg)",
              }}
            />
          </div>


          {/* Separación real entre cards para que el logo quede entre medio */}
          <div style={{ height: "35px" }} />

          {/* ======= CARD 2: TOTAL A PAGAR ======= */}
          <div style={{ ...cardStyle, position: "relative" }}>
            {/* Bandera derecha (origen) */}
            <img
              src={
                paisInicial === "Bolivia"
                  ? `${import.meta.env.BASE_URL}bolivia.png`
                  : `${import.meta.env.BASE_URL}argentina.png`
              }
              alt="Bandera origen"
              style={{
                position: "absolute",
                right: "28px",
                top: "28px",
                width: "98px",
                height: "82px",
                borderRadius: "4px",
              }}
            />

            <div style={titleLeft}>Total a pagar</div>

            <div style={bigLeft}>
              {fmt2(totalN)} {monedaPago}
            </div>

            {/* Comisión: izquierda texto, derecha monto (misma línea) */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <span style={{ ...smallGray, marginTop: 0 }}>
                Comisión incluida: {comisionVisible}%
              </span>
              <span style={{ ...smallGray, marginTop: 0 }}>
                {fmt2(comisionMontoN)} {monedaPago}
              </span>
            </div>
          </div>
        </div>

        {/* ======= BANCOS (SIN RECTÁNGULO) ======= */}
        <div style={{ marginTop: "26px", textAlign: "center" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "40px",
              fontWeight: 800,
              marginBottom: "14px",
            }}
          >
            Utiliza este banco
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "38px", color: "#ffffff" }}>
            {/* === LÓGICA DE BANCOS ORIGINAL (MISMA ESTRUCTURA) === */}
            {usuario === "Zeggers" ? (
              paisInicial === "Bolivia" ? (
                bancoBob === "Banco Ganadero" ? (
                  <img
                    src={`${import.meta.env.BASE_URL}Zegers Banco Ganadero.jpg`}
                    alt="QR Zegers Banco Ganadero"
                    style={{ width: "320px", height: "320px" }}
                  />
                ) : (
                  <img
                    src={`${import.meta.env.BASE_URL}Zegers Yape.jpg`}
                    alt="QR Zegers Yape"
                    style={{ width: "320px", height: "320px" }}
                  />
                )
              ) : bancoArs === "Mercado Pago" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  SANTIAGO ZEGERS BRIANCON
                  <br />
                  DNI: 96081178
                  <br />
                  Alias: szegersb
                  <br />
                  CBU: 0000003100068509876137
                  <br />
                  Mercado Pago
                </p>
              ) : bancoArs === "Banco Ualá" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  SANTIAGO ZEGERS BRIANCON
                  <br />
                  DNI: 96081178
                  <br />
                  Alias: zegerssantiagob.uala
                  <br />
                  CBU: 0000007900209608117808
                  <br />
                  Banco Ualá
                </p>
              ) : bancoArs === "banco lemon" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  SANTIAGO ZEGERS BRIANCON
                  <br />
                  DNI: 96081178
                  <br />
                  Alias: zegers.LEMON
                  <br />
                  CBU: 0000168300000002946041
                  <br />
                  Banco Lemon / Findi SA
                </p>
              ) : bancoArs === "Banco Brubank" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  SANTIAGO ZEGERS BRIANCON
                  <br />
                  DNI: 96081178
                  <br />
                  Alias: santiagozegers
                  <br />
                  CBU: 1430001713040034310010
                  <br />
                  Banco Brubank
                </p>
              ) : (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  SANTIAGO ZEGERS BRIANCON
                  <br />
                  DNI: 96081178
                  <br />
                  Alias: ACUDIERA.NUCA.ABEDUL
                  <br />
                  CBU: 0070086330004049205162
                  <br />
                  Banco Galicia
                </p>
              )
            ) : usuario === "Nacho" ? (
              paisInicial === "Bolivia" ? (
                bancoBob === "Banco Ganadero" ? (
                  <img
                    src={`${import.meta.env.BASE_URL}Nacho Banco Ganadero.jpg`}
                    alt="QR Nacho Banco Ganadero"
                    style={{ width: "320px", height: "320px" }}
                  />
                ) : bancoBob === "Banco BCP" ? (
                  <img
                    src={`${import.meta.env.BASE_URL}Nacho Banco BCP.jpg`}
                    alt="QR Nacho Banco BCP"
                    style={{ width: "320px", height: "320px" }}
                  />
                ) : (
                  <img
                    src={`${import.meta.env.BASE_URL}Nacho Banco Mercantil.jpg`}
                    alt="QR Nacho Banco Mercantil"
                    style={{ width: "320px", height: "320px" }}
                  />
                )
              ) : bancoArs === "Mercado Pago" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  IGNACIO BLUSKE BRIANCON
                  <br />
                  DNI: 51702821
                  <br />
                  Alias: Ignacioblusk5
                  <br />
                  Mercado Pago
                </p>
              ) : bancoArs === "Banco Ualá" ? (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  IGNACIO BLUSKE BRIANCON
                  <br />
                  DNI: 51702821
                  <br />
                  Alias: ibluskeb.uala
                  <br />
                  CBU: 0000007900205170282162
                  <br />
                  Banco Ualá
                </p>
              ) : (
                <p style={{ 
                    textAlign: "left" ,
                    fontSize: "18px",
                    lineHeight: "1.7",
                }}>
                  IGNACIO BLUSKE BRIANCON
                  <br />
                  DNI: 51702821
                  <br />
                  Alias: ibluskeb.lemon
                  <br />
                  CBU: 0000168300000015980139
                  <br />
                  Banco Lemon
                </p>
              )
            ) : (
              <p>Nada</p>
            )}
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#bbbbbb", textAlign: "center", marginTop: "18px" }}>
          Al realizar el pago, está aceptando nuestros términos y condiciones. Puede verlos en nuestra web o puede solicitar la información al respecto.
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
  monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  comisionVisible: PropTypes.number.isRequired,
  cotizacionBinanceCompra: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cotizacionBinanceVenta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cotizacionDescuento: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  recibe: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  paganSinComision: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  paganConComision: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Exportar;
