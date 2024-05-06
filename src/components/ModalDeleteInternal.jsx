/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useInternal } from "../context/InternalContext";

// IMPORTAMOS LAS AYUDAS
import { handleResponseMessages } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalDeleteInternal.css";

export default function ModalDeleteInternal({
  currentId,
  showModalDeleteInternal,
  setShowModalDeleteInternal,
  getCategoriesAndInternalAgain,
  setGetCategoriesAndInternalAgain,
}) {
  const { deleteInternal } = useInternal();

  const classModalDeleteInternal = showModalDeleteInternal
    ? "ModalDeleteInternal Show"
    : "ModalDeleteInternal";

  const handleDeleteInternal = async () => {
    try {
      const res = await deleteInternal(currentId);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setGetCategoriesAndInternalAgain(!getCategoriesAndInternalAgain);
      setShowModalDeleteInternal(false);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return (
    <main className={classModalDeleteInternal}>
      <div className="ModalDeleteInternal__Container">
        <button
          className="ModalDeleteInternal__Container__Close"
          onClick={() => setShowModalDeleteInternal(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalDeleteInternal__Container__Title">Advertencia</p>
        <hr className="ModalDeleteInternal__Container__Divisor" />
        <p className="ModalDeleteInternal__Container__Text">
          ¿Estas seguro de que deseas <b>eliminar este producto interno</b>?
          Esta operación no podrá ser revertida una vez realizada.
        </p>
        <button
          className="ModalDeleteInternal__Container__Form--Button"
          onClick={handleDeleteInternal}
        >
          Eliminar
        </button>
      </div>
    </main>
  );
}
