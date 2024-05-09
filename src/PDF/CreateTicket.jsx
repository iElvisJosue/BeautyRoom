/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import beautyRoomLogo from "../../public/BeautyRoomLogoTicket.png";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  container: {
    width: "200px",
    height: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  containerHeader: {
    paddingBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    borderBottom: "1px dashed black",
  },
  containerImgLogo: {
    width: "70px",
    height: "40px",
    alignSelf: "center",
  },
  containerNormalText: {
    textAlign: "center",
    fontSize: "6px",
    fontWeight: "normal",
  },
  containerTableHeader: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    paddingBottom: "10px",
    borderBottom: "1px dashed black",
  },
  containerTableProducts: {
    width: "180px",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  containerNormalTextAmount: {
    width: "20px",
    textAlign: "left",
    fontSize: "6px",
  },
  containerNormalTextNameProduct: {
    width: "80px",
    fontSize: "6px",
    fontWeight: "normal",
  },
  containerNormalTextPU: {
    width: "40px",
    textAlign: "right",
    fontSize: "6px",
  },
  containerNormalTextTotal: {
    width: "40px",
    textAlign: "right",
    fontSize: "6px",
  },
  containerFooter: {
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    borderTop: "1px dashed black",
  },
  containerNormalTextTotalPrice: {
    textAlign: "center",
    fontSize: "8px",
    fontWeight: "bold",
  },
});

export default function CreateTicket({ cart }) {
  // ANTES DE REMOVER EL CARRITO, ENVIAMOS LOS DATOS

  const today = new Date();
  const date = today.toLocaleString();

  const getTotal = () => {
    const total = cart.reduce((acc, product) => acc + product.PrecioTotal, 0);
    return total;
  };

  return (
    <Document>
      <Page size={{ width: "80mm" }} style={styles.page}>
        {/* <Page size={{ width: 80 }} style={styles.page}> */}
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Image src={beautyRoomLogo} style={styles.containerImgLogo} />
            <Text style={styles.containerNormalText}>
              Acapulco de Juarez, Guerrero
            </Text>
            <Text style={styles.containerNormalText}>
              Plaza Arrecife Local 203 y 204
            </Text>
            <Text style={styles.containerNormalText}>
              Fecha y hora:{" "}
              <Text style={styles.containerNormalText}>{date}</Text>
            </Text>
            <Text style={styles.containerNormalText}>
              Método de pago: {cart[0].MetodoDePago}
            </Text>
            <Text style={styles.containerNormalText}>
              Le atendió: {cart[0].EmpleadoAsignado}
            </Text>
            <Text style={styles.containerNormalText}>
              Folio: {cart[0].NumeroDeFolio}
            </Text>
          </View>
          <View style={styles.containerTableHeader}>
            <Text style={styles.containerNormalTextAmount}>Cant</Text>
            <Text style={styles.containerNormalTextNameProduct}>Prod</Text>
            <Text style={styles.containerNormalTextPU}>P.U</Text>
            <Text style={styles.containerNormalTextTotal}>Total</Text>
          </View>
          {cart.map((product, index) => (
            <View style={styles.containerTableProducts} key={index}>
              <Text style={styles.containerNormalTextAmount}>
                {product.CantidadEnCarrito}
              </Text>
              <Text style={styles.containerNormalTextNameProduct}>
                {product.NombreProducto}
              </Text>
              <Text style={styles.containerNormalTextPU}>
                $
                {product.PrecioProductoConDescuento?.toLocaleString() ??
                  product.CostoSubservicio?.toLocaleString()}
              </Text>
              <Text style={styles.containerNormalTextTotal}>
                ${product.PrecioTotal?.toLocaleString()}
              </Text>
            </View>
          ))}
          <View style={styles.containerFooter}>
            <Text style={styles.containerNormalText}>IMPORTE TOTAL</Text>
            <Text style={styles.containerNormalTextTotalPrice}>
              ${getTotal().toLocaleString()}
            </Text>
            <Text style={styles.containerNormalText}>
              Agradecemos sinceramente tu preferencia y esperamos verte de nuevo
              pronto. (Este ticket se registrará en nuestras transacciones del
              día)
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
