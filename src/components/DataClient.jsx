/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
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
  // setDateInformation,
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

  // AGREGAMOS LA CITA AL LOCAL STORAGE EN CUANTO LLEGUEMOS A ESTE COMPONENTE
  useEffect(() => {
    // ASIGNAMOS UN FORMATO DE AAAAA-MM-DD A LA CITA
    const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
    dateInformation.FechaCita = dateFormatted;
    // TAMBIÉN AGREGAMOS LA CITA CON FORMATO DE FECHA TIPO "23 de MAYO de 2024 a las 10:00"
    const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
    dateInformation.FechaCitaFormateada = FechaCitaFormateada;

    // COMPROBAMOS SI EXISTE UNA CITA CON LA MISMA FECHA, HORA Y EMPLEADO ASIGNADO
    const exists = cartDates.some(
      (item) =>
        item.EmpleadoAsignado === dateInformation.EmpleadoAsignado &&
        item.HoraCita === dateInformation.HoraCita &&
        item.FechaCita === dateInformation.FechaCita
    );
    // SI EXISTE UNA CITA CON LA MISMA FECHA, HORA Y EMPLEADO ASIGNADO, MOSTRAMOS UN MENSAJE DE ERROR
    if (exists) {
      toast.error("Ya existe una cita con la misma FECHA, HORA Y EMPLEADO ❌");
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

  const handleAddDataClientToCartDates = handleSubmit(async (data) => {
    // AGREGAMOS LOS DATOS DEL CLIENTE A CADA CITA EXISTENTE EN EL CARRITO
    cartDates.forEach((cartDateInformation) => {
      cartDateInformation.NombreCliente = data.NombreCliente;
      cartDateInformation.TelefonoCliente = data.TelefonoCliente;
      cartDateInformation.MetodoPago = data.MetodoPago;
    });
    verifyDateDuplicateExist(cartDates);
    // const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
    // data.FechaCita = dateFormatted;
    // setDateInformation({ ...dateInformation, ...data });
    // const dataClient = { ...dateInformation, ...data };
    // verifyDateDuplicateExist(dataClient);
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
        // user ? createDateByAdmin(dataDate) : checkPayment(dataDate);
      }
      // if (res.data.length > 0) {
      //   return toast.error(
      //     "¡Ya no hay citas disponibles para esta hora! Por favor selecciona una nueva fecha y/o hora ❌"
      //   );
      // }
      // else {
      //   user ? createDateByAdmin(cartDates) : checkPayment(cartDates);
      // }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  // const createDateByAdmin = async (dataInfo) => {
  //   // const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
  //   // dataInfo.FechaCitaFormateada = FechaCitaFormateada;
  //   try {
  //     // LO ENVIAMOS COMO UN ARRAY PARA VERIFICAR LA CANTIDAD DE CITAS
  //     const res = await adminCreateNewDate(dataInfo);
  //     const { status, data } = res;
  //     handleResponseMessages({ status, data });
  //     // ELIMINAMOS EL CARRITO DE CITAS
  //     localStorage.removeItem("cartDates");
  //     navigate("/CitaCreada");
  //   } catch (error) {
  //     const { status, data } = error.response;
  //     handleResponseMessages({ status, data });
  //   }
  // };
  // const checkPayment = (dataCartDates) => {
  //   if (dataCartDates[0].MetodoPago === "PayPal") {
  //     setShowModalPay(true);
  //   }
  //   if (dataCartDates[0].MetodoPago === "Transferencia") {
  //     createDateByAdmin(dataCartDates);
  //   }
  // };

  // CON ESTA FUNCIÓN VAMOS A EDITAR LA CITA, Y A SU VEZ ELIMINAR EL CARRITO Y A REINICIAR EL CARRITO
  // const handleEditDate = () => {
  //   localStorage.removeItem("cartDates");
  //   setCartDates([]);
  //   setProgressDate(0);
  // };

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
          onSubmit={handleAddDataClientToCartDates}
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
            >
              {user?.rolUsuario === "Administrador"
                ? listOfPaymentsForAdmin
                : listOfPaymentsForClient}
            </select>
          </div>
          <button className="DataClient__Container__Form--Button">
            Ir a pagar
          </button>
        </form>
      </aside>
    </div>
  );
}
