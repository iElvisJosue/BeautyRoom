/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LAS AYUDAS
import { modalPayInputsProps } from "../helpers/ModalPay";

// IMPORTAMOS LOS ESTILOS
import "../styles/ModalPay.css";

export default function ModalPay({ showModalPay, setShowModalPay }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const checkDataPay = handleSubmit((data) => {
    console.log(data);
    toast.success("¡Pago realizado correctamente! 🎉");
    setShowModalPay(false);
  });

  const classModalPay = `ModalPay ${showModalPay ? "Show" : ""}`;

  return (
    <main className={classModalPay}>
      <div className="ModalPay__Container">
        <button
          className="ModalPay__Container__Close"
          onClick={() => setShowModalPay(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <p className="ModalPay__Container__Title">Datos Bancarios</p>
        <hr className="ModalPay__Container__Divisor" />
        <form onSubmit={checkDataPay} className="ModalPay__Container__Form">
          {modalPayInputsProps.map(
            ({
              isDuo,
              inputTitle,
              inputName,
              placeholder,
              validator,
              inputDetails,
            }) => (
              <>
                {isDuo ? (
                  <div className="ModalPay__Container__Form--Inputs--Double">
                    {inputDetails.map(
                      ({ inputTitle, inputName, placeholder, validator }) => (
                        <span
                          className="ModalPay__Container__Form--Inputs"
                          key={inputName}
                        >
                          <p className="ModalPay__Container__Form--Inputs--Title">
                            {inputTitle}
                          </p>
                          <input
                            type="text"
                            {...register(inputName, validator)}
                            className="ModalPay__Container__Form--Inputs--Input"
                            placeholder={placeholder}
                          ></input>
                          <ErrorMessage
                            errors={errors}
                            name={inputName}
                            render={({ messages }) =>
                              messages &&
                              Object.entries(messages).map(
                                ([type, message]) => (
                                  <small
                                    key={type}
                                    className="DataClient__Container__Form--Data--SmallError"
                                  >
                                    {message}
                                  </small>
                                )
                              )
                            }
                          />
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <span
                    className="ModalPay__Container__Form--Inputs"
                    key={inputName}
                  >
                    <p className="ModalPay__Container__Form--Inputs--Title">
                      {inputTitle}
                    </p>
                    <input
                      type="text"
                      {...register(inputName, validator)}
                      className="ModalPay__Container__Form--Inputs--Input"
                      placeholder={placeholder}
                    ></input>
                  </span>
                )}
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
          <button className="ModalPay__Container__Form--Button">
            Pagar $100
          </button>
        </form>
      </div>
    </main>
  );
}
