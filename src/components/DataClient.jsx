/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMG } from "../helpers/Urls";
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
  setDateInformation,
  setProgressDate,
  monthNumber,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();
  const { user } = useGlobal();
  const { showModalPay, setShowModalPay } = useModalPay();
  const { verifyDateExist, adminCreateNewDate } = useDates();
  const {
    DíaCitaNombre,
    DíaCita,
    NombreMesCita,
    AñoCita,
    HoraCita,
    NombreServicio,
    ImagenServicio,
    NombreSubservicio,
  } = dateInformation;

  const handleDataClient = handleSubmit(async (data) => {
    const dateFormatted = DateFormatted(AñoCita, monthNumber, DíaCita);
    data.FechaCita = dateFormatted;
    setDateInformation({ ...dateInformation, ...data });
    const dataClient = { ...dateInformation, ...data };
    verifyDateDuplicateExist(dataClient);
  });

  const verifyDateDuplicateExist = async (dataClient) => {
    try {
      const res = await verifyDateExist(dataClient);
      if (res.data.length > 0) {
        return toast.error(
          "¡Ya no hay citas disponibles para esta hora! Por favor selecciona una nueva fecha y/o hora ❌"
        );
      } else {
        user ? createDateByAdmin(dataClient) : checkPayment(dataClient);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const createDateByAdmin = async (dataInfo) => {
    const FechaCitaFormateada = `${DíaCita} de ${NombreMesCita} de ${AñoCita} a las ${HoraCita}`;
    dataInfo.FechaCitaFormateada = FechaCitaFormateada;
    try {
      const res = await adminCreateNewDate(dataInfo);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      navigate("/CitaCreada");
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const checkPayment = (data) => {
    if (data.MetodoPago === "PayPal") {
      setShowModalPay(true);
    }
    if (data.MetodoPago === "Transferencia") {
      createDateByAdmin(data);
    }
  };

  return (
    <div className="DataClient__Container">
      {dateInformation && (
        <ModalPay
          showModalPay={showModalPay}
          setShowModalPay={setShowModalPay}
          dateInformation={dateInformation}
        />
      )}
      <aside className="DataClient__Container__DateInformation">
        <p className="DataClient__Container__DateInformation__Title">
          Datos de la cita <br /> programada
        </p>
        <div className="DataClient__Container__DateInformation__Service">
          <picture className="DataClient__Container__DateInformation__Service--Img">
            <img
              src={`${HOST_IMG}/${ImagenServicio}`}
              alt="Icono del servicio seleccionado"
            />
          </picture>
          <p>
            {NombreServicio} - {NombreSubservicio}
          </p>
        </div>
        <div className="DataClient__Container__DateInformation__Details">
          <span className="DataClient__Container__DateInformation__Details--Day">
            <img src="IconoCalendario.png" alt="Icono del calendario" />
            <p>
              {`${DíaCitaNombre} ${DíaCita}`}
              <br />
              {`de ${NombreMesCita} del ${AñoCita}`}
            </p>
          </span>
          <span className="DataClient__Container__DateInformation__Details--Hour">
            <img src="IconoReloj.png" alt="Icono del horario" />
            <p>{HoraCita}</p>
          </span>
        </div>
        <button
          className="DataClient__Container__DateInformation__Button"
          onClick={() => setProgressDate(0)}
        >
          Editar
        </button>
      </aside>
      <aside className="DataClient__Container__Form">
        <p className="DataClient__Container__Form__Title">Completa tus datos</p>
        <form
          onSubmit={handleDataClient}
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
