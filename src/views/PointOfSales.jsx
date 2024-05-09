// LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES
import Navbar from "../components/Navbar";
import SubMenuPointOfSales from "../components/SubMenuPointOfSales";
import PointOfSalesCart from "../components/PointOfSalesCart";
import PointOfSalesProducts from "../components/PointOfSalesProducts";
import PointOfSalesServices from "../components/PointOfSalesServices";
// import PointOfSalesInternal from "../components/PointOfSalesInternal";
import ModalPayCart from "../components/ModalPayCart";

// IMPORTAMOS LOS HOOKS
import useSubMenuPointOfSales from "../hooks/useSubMenuPointOfSales";
import useShowCart from "../hooks/useShowCart";
import useGetCart from "../hooks/useGetCart";
import useModalPayCart from "../hooks/useModalPayCart";

// IMPORTAMOS LOS ESTILOS
import "../styles/PointOfSales.css";

export default function PointOfSales() {
  const { showCart, setShowCart } = useShowCart();
  const { optionSubMenuPointOfSales, setOptionSubMenuPointOfSales } =
    useSubMenuPointOfSales();
  const { cart, setCart, getCartAgain, setGetCartAgain } = useGetCart();
  const { showModalPayCart, setShowModalPayCart } = useModalPayCart();

  const pointOfSalesProps = {
    optionSubMenuPointOfSales,
    setOptionSubMenuPointOfSales,
    cart,
    setCart,
    getCartAgain,
    setGetCartAgain,
    showCart,
    setShowCart,
    setShowModalPayCart,
  };

  const currentPointOfSales = {
    0: PointOfSalesProducts,
    1: PointOfSalesServices,
    // 2: PointOfSalesInternal,
  };

  const PointOfSalesToRender = currentPointOfSales[optionSubMenuPointOfSales];

  return (
    <main className="PointOfSales">
      <Navbar fullScreen={true}>Punto de Venta</Navbar>
      {showCart && <PointOfSalesCart {...pointOfSalesProps} />}
      {!showCart && (
        <button
          className="PointOfSales__ButtonCart"
          onClick={() => setShowCart(true)}
        >
          <ion-icon name="cart"></ion-icon>
        </button>
      )}
      {showModalPayCart && <ModalPayCart {...pointOfSalesProps} />}
      <div className="PointOfSales__Container">
        <SubMenuPointOfSales
          NombreOpciónUno="Productos"
          NombreOpciónDos="Servicios"
          // NombreOpciónTres="Interno"
          {...pointOfSalesProps}
        ></SubMenuPointOfSales>
        <PointOfSalesToRender {...pointOfSalesProps} />
      </div>

      <Toaster position="top-left" richColors closeButton />
    </main>
  );
}
