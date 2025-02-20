import React, { useRef, useState, useEffect } from "react";
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
    const monthAbbr = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const year = date.getFullYear().toString().slice(-3); 
    return `${randomNumbers}${monthAbbr}${year}`;
  };
  
  const codigo = generarCodigo();

  const exportToImage = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `Cotizacion_${codigo}.png`;
        link.click();
      });
    }
  };

  return (
    <div>
      <button onClick={exportToImage}>Exportar como Imagen</button>
      <div
        ref={tableRef}
        style={{
          width: "650px",
          backgroundColor: "#001b36",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          borderCollapse: "collapse",
          padding: "0px",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "0px", padding: "5px" }}>COTIZACIONES</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "2px" }}>Cambio BOB/USD</td>
              {paisInicial === "Bolivia" ? (
                <td style={{ textAlign: "right", padding: "2px" }}>
                  {new Intl.NumberFormat("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                  })
                  .format(cotizacionBinanceCompra)
                  } Bs.
                </td>
              ):(
                <td style={{ textAlign: "right", padding: "2px" }}>{cotizacionDescuento} ARS</td>
              )}
              <td style={{ padding: "2px" }}>Cambio ARS/USD</td>
              {paisInicial === "Bolivia" ? (
                <td style={{ textAlign: "right", padding: "2px" }}>{cotizacionDescuento} ARS</td>
              ):(
                <td style={{ textAlign: "right", padding: "2px" }}>
                  {new Intl.NumberFormat("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                  })
                  .format(cotizacionBinanceCompra)
                  } ARS
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <h3 style={{ backgroundColor: "#001b36", color: "white", padding: "2px", textAlign: "center", margin: "0px" }}>MONTO COTIZADO: {cambios} {new Intl.NumberFormat("es-ES", {
                maximumFractionDigits: 2,
                useGrouping: true,
                })
                .format(monto)
                .replace(".", ",")}{" "}
        </h3>

        <h3 style={{ backgroundColor: "#e6ad00", color: "white", padding: "2px", textAlign: "center", margin: "0px" }}>
          RECIBE EN {paisInicial==="Bolivia"? "ARGENTINA" : "BOLIVIA"}: {paisInicial==="Bolivia" ? "ARS" : "BOB"} {recibe}
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ backgroundColor: "#001b36", color: "white", padding: "2px" }}>COMISIÓN</td>
              <td style={{ padding: "2px" }}>{comisionVisible}%</td>
              <td style={{ padding: "2px" }}>BOB</td>
              <td style={{ padding: "2px" }}>{paganConComision}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ backgroundColor: "#e6ad00", color: "white", padding: "2px", textAlign: "center", margin: "0px" }}>TOTAL A PAGAR EN: {paisInicial==="Bolivia"? "BOB" : "ARS"} {total}</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "2px" }}>Fecha:</td>
              <td style={{ padding: "2px" }}>{fecha}</td>
              <td style={{ padding: "2px" }}>Número de orden:</td>
              <td style={{ padding: "2px" }}>{codigo}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
            {usuario === "Zeggers" ? (
              paisInicial === "Bolivia" ? (
                bancoBob === "Banco Ganadero" ? (
                  <div>
                    <h4>USA ESTE QR PARA FACILITARTE:</h4>
                    <img
                      src={`${import.meta.env.BASE_URL}Zegers Banco Ganadero.jpg`}
                      alt="QR Code"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>

                ) : (
                  <div>
                    <h4>USA ESTE QR PARA FACILITARTE:</h4>
                    <img
                      src={`${import.meta.env.BASE_URL}Zegers Yape.jpg`}
                      alt="QR Code"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                )
              ) : (
                bancoArs === "Mercado Pago" ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                    <p>
                      SANTIAGO ZEGERS BRIANCON
                      <br />
                      DNI: 96081178
                      <br />
                      Alias: szegersb
                      <br />
                      Banco MercadoPago
                    </p>
                  </div>
                ) : (
                  bancoArs === "Banco Ualá" ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                      <p>
                        SANTIAGO ZEGERS BRIANCON
                        <br />
                        DNI: 96081178
                        <br />
                        Alias: zegerssantiagob.uala
                        <br />
                        Banco UALÁ
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                      <p>
                        SANTIAGO ZEGERS BRIANCON
                        <br />
                        DNI: 96081178
                        <br />
                        Alias: zegers.LEMON
                        <br />
                        Banco LEMON
                      </p>
                    </div>
                  )
                )
              )
            ) : usuario === "Nacho" ? (
              paisInicial === "Bolivia" ? (
                bancoBob === "Banco Ganadero" ? (
                  <div>
                    <h4>USA ESTE QR PARA FACILITARTE:</h4>
                    <img
                      src={`${import.meta.env.BASE_URL}Nacho Banco Ganadero.jpg`}
                      alt="QR Code"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <h4>USA ESTE QR PARA FACILITARTE:</h4>
                    <img
                      src={`${import.meta.env.BASE_URL}Nacho Banco BNB.jpg`}
                      alt="QR Code"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </div>
                )
              ) : (
                (bancoArs === "Mercado Pago") ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                    <p>
                      IGNACIO BLUSKE BRIANCON
                      <br />
                      DNI: 51702821
                      <br />
                      Alias: Ignacioblusk5
                      <br />
                      Mercado Pago
                    </p>
                  </div>
                ) :(
                  (bancoArs === "Banco Ualá") ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                      <p>
                        IGNACIO BLUSKE BRIANCON
                        <br />
                        DNI: 51702821
                        <br />
                        Alias: ibluskeb.uala
                        <br />
                        Uala
                        <br />
                        CVU: 0000007900205170282162
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                      <p>
                        IGNACIO BLUSKE BRIANCON
                        <br />
                        DNI: 51702821
                        <br />
                        Alias: ibluskeb.PREX
                        <br />
                        Prex
                        <br />
                        CVU: 0000013000032236016029
                      </p>
                    </div>                 
                  )
                )
              )
            ) : (
              <p>Nada</p>
            )}
          </div>
          <div>
            <img src={`${import.meta.env.BASE_URL}Logo.png`} alt="Logo Empresa" style={{ width: "300px", height: "300px" }} />
          </div>
        </div>

        <p style={{ fontSize: "12px", textAlign: "center", margin: "0px", padding: "5px" }}>
          Al realizar el pago, está aceptando nuestros términos y condiciones. Puede verlos en nuestra web o puede solicitar la información al respecto.
        </p>
      </div>
    </div>
  );
};

export default Exportar;
