/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalDeleteProduct.css";

export default function ModalDeleteProduct({
  currentId,
  showModalDeleteProduct,
  setShowModalDeleteProduct,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const { deleteProduct } = useProducts();

  const classModalDeleteProduct = showModalDeleteProduct
    ? "ModalDeleteProduct Show"
    : "ModalDeleteProduct";

  const handleDeleteProduct = async () => {
    try {
      const res = await deleteProduct(currentId);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
      setShowModalDeleteProduct(false);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <main className={classModalDeleteProduct}>
      <div className="ModalDeleteProduct__Container">
        <button
          className="ModalDeleteProduct__Container__Close"
          onClick={() => setShowModalDeleteProduct(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalDeleteProduct__Container__Title">Advertencia</p>
        <hr className="ModalDeleteProduct__Container__Divisor" />
        <p className="ModalDeleteProduct__Container__Text">
          ¿Estas seguro de que deseas <b>eliminar este producto</b>? Esta
          operación no podrá ser revertida una vez realizada.
        </p>
        <button
          className="ModalDeleteProduct__Container__Form--Button"
          onClick={handleDeleteProduct}
        >
          Eliminar
        </button>
      </div>
    </main>
  );
}
