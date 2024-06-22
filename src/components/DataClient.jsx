/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import DataClientOneDate from "../components/DataClientOneDate";
import DataClientMultipleDates from "../components/DataClientMultipleDates";

// IMPORTAMOS LAS AYUDAS
// import { HOST_IMG } from "../helpers/Urls";
import {
  listOfPaymentsForAdmin,
  listOfPaymentsForClient,
} from "../helpers/ListOfPayments";
import { dataClientInputsProps } from "../helpers/DataClient";
import { handleResponseMessages } from "../helpers/RespuestasServidor";
import { DateFormatted } from "../helpers/DateFormatted";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useDates } from "../context/DatesContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useModalPay from "../hooks/useModalPay";

// IMPORTAMOS LOS COMPONENTES
import ModalPay from "../components/ModalPay";

// IMPORTAMOS LOS ESTILOS
import "../styles/DataClient.css";

export default function DataClient({
  dateInformation,
  setProgressDate,
  monthNumber,
  cartDates,
  setCartDates,
  getCartDatesAgain,
  setGetCartDatesAgain,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { user } = useGlobal();
  const { showModalPay, setShowModalPay } = useModalPay();
  const { verifyDateExist } = useDates();
  const { DíaCita, NombreMesCita, AñoCita, HoraCita } = dateInformation;
  const [metodoPago, setMetodoPago] = useState("Transferencia");
  const COSTO_CITA = 150;

  // AGREGAMOS LA CITA AL LOCAL STORAGE EN CUANTO LLEGUEMOS A ESTE COMPONENTE
  useEffect(() => {
    // ASIGNAMOS UN FORMATO DE AAAAA-MM-DD A LA CITA
    const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
    dateInformation.FechaCita = dateFormatted;
    // TAMBIÉN AGREGAMOS LA CITA CON FORMATO DE FECHA TIPO "23 de MAYO de 2024 a las 10:00"
    const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
    dateInformation.FechaCitaFormateada = FechaCitaFormateada;
    // AGREGAMOS EL CREADOR DE LA CITA
    dateInformation.CreadorCita = user?.rolUsuario ?? "Cliente";

    // COMPROBAMOS SI EXISTE UNA CITA CON LA MISMA FECHA, HORA Y EMPLEADO ASIGNADO
    const exists = cartDates.some(
      (item) =>
        item.HoraCita === dateInformation.HoraCita &&
        item.FechaCita === dateInformation.FechaCita
    );
    // SI EXISTE UNA CITA CON LA MISMA FECHA, HORA Y EMPLEADO ASIGNADO, MOSTRAMOS UN MENSAJE DE ERROR
    if (exists) {
      toast.error("Ya agregaste una cita con la misma FECHA Y HORA ❌");
    }
    // SI NO EXISTE UNA CITA CON LA MISMA FECHA, HORA Y EMPLEADO ASIGNADO, AGREGAMOS LA CITA AL LOCAL STORAGE
    else {
      // AGREGAMOS LA CITA FORMATEADA A CADA ELEMENTO DEL CARRITO DE CITAS
      localStorage.setItem(
        "cartDates",
        JSON.stringify([...cartDates, dateInformation])
      );
      setCartDates([...cartDates, dateInformation]);
    }
  }, []);

  const checkPaymentMethod = handleSubmit(async (data) => {
    if (
      user?.rolUsuario === "Administrador" &&
      metodoPago === "Transferencia"
    ) {
      const CostoCita = document.getElementById("CostoCita").value;
      const regex = /^\d+$/;
      if (CostoCita.length > 0 && regex.test(CostoCita)) {
        // AGREGAMOS EL COSTO DE LA CITA A CADA CITA
        cartDates.forEach((cartDateInformation) => {
          cartDateInformation.CostoCita = Number(CostoCita);
        });
        handleAddDataClientToCartDates(data);
      } else {
        return toast.error(
          "El costo ingresado no es valido, por favor ingrese una cantidad valida ❌"
        );
      }
    } else {
      // ASIGNAMOS EL COSTO POR DEFECTO A CADA CITA
      cartDates.forEach((cartDateInformation) => {
        cartDateInformation.CostoCita = COSTO_CITA;
      });
      handleAddDataClientToCartDates(data);
    }
  });

  const handleAddDataClientToCartDates = handleSubmit(async (data) => {
    // AGREGAMOS LOS DATOS DEL CLIENTE A CADA CITA EXISTENTE EN EL CARRITO
    cartDates.forEach((cartDateInformation) => {
      cartDateInformation.NombreCliente = data.NombreCliente;
      cartDateInformation.TelefonoCliente = data.TelefonoCliente;
      cartDateInformation.MetodoPago = data.MetodoPago;
    });
    verifyDateDuplicateExist(cartDates);
  });

  const verifyDateDuplicateExist = async (dataDate) => {
    try {
      const res = await verifyDateExist(dataDate);
      if (res.response) {
        const { data } = res.response;
        const indicesTrue = data
          .map((value, index) => (value === true ? index + 1 : -1))
          .filter((index) => index !== -1);
        const citasConFechaExistente = indicesTrue.join(", ");
        toast.error(
          `Las citas ${citasConFechaExistente} no pueden ser creada porque ya hay una asignada para esa misma fecha, por favor selecciona una nueva fecha y/o hora ❌`
        );
      } else {
        // MOSTRAMOS EL MODAL CON LA INFORMACIÓN DE LAS CITAS
        setShowModalPay(true);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };
  const classAside =
    cartDates.length === 1
      ? "DataClient__Container__DateInformation"
      : "DataClient__Container__DateInformation Multiples";

  return (
    <div className="DataClient__Container">
      {cartDates.length > 0 && (
        <ModalPay
          cartDates={cartDates}
          showModalPay={showModalPay}
          setShowModalPay={setShowModalPay}
          dateInformation={dateInformation}
        />
      )}
      <aside className={classAside}>
        {cartDates.length === 1 ? (
          <DataClientOneDate
            setCartDates={setCartDates}
            cartDates={cartDates}
            setProgressDate={setProgressDate}
          />
        ) : (
          <DataClientMultipleDates
            setCartDates={setCartDates}
            cartDates={cartDates}
            setProgressDate={setProgressDate}
            getCartDatesAgain={getCartDatesAgain}
            setGetCartDatesAgain={setGetCartDatesAgain}
          />
        )}
      </aside>
      <aside className="DataClient__Container__Form">
        <p className="DataClient__Container__Form__Title">Completa tus datos</p>
        <form
          onSubmit={checkPaymentMethod}
          className="DataClient__Container__Form--Data"
        >
          {dataClientInputsProps.map(
            ({ inputTitle, inputName, placeholder, validator }) => (
              <>
                <div className="DataClient__Container__Form--Data--Inputs">
                  <p className="DataClient__Container__Form--Data--Inputs--Title">
                    {inputTitle}
                  </p>
                  <input
                    type="text"
                    {...register(inputName, validator)}
                    className="DataClient__Container__Form--Data--Inputs--Input"
                    placeholder={placeholder}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name={inputName}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="DataClient__Container__Form--Data--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <div className="DataClient__Container__Form--Data--Inputs">
            <p className="DataClient__Container__Form--Data--Inputs--Title">
              Método de pago
            </p>
            <select
              {...register("MetodoPago")}
              className="DataClient__Container__Form--Data--Inputs--Input"
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              {user?.rolUsuario === "Administrador"
                ? listOfPaymentsForAdmin
                : listOfPaymentsForClient}
            </select>
          </div>
          {user?.rolUsuario === "Administrador" &&
            metodoPago === "Transferencia" && (
              <div className="DataClient__Container__Form--Data--Inputs">
                <p className="DataClient__Container__Form--Data--Inputs--Title">
                  Costo por cita:
                </p>
                <input
                  type="text"
                  className="DataClient__Container__Form--Data--Inputs--Input"
                  placeholder="0"
                  id="CostoCita"
                />
              </div>
            )}
          <button className="DataClient__Container__Form--Button">
            Ir a pagar
          </button>
        </form>
      </aside>
    </div>
  );
}
