/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProducts } from "../context/ProductsContext";

// IMPORTAMOS LAS AYUDAS
import { dataAddProductInputsProps } from "../helpers/InputsAddProduct";
import { handleResponseMessages } from "../helpers/RespuestasServidor";
import { HOST_IMG } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../styles/AdminAddProduct.css";

export default function AdminEditProduct({
  categoriesAndProducts,
  currentId,
  setOptionSubMenu,
  getCategoriesAndProductsAgain,
  setGetCategoriesAndProductsAgain,
}) {
  const [image, setImage] = useState(currentId?.ImagenProducto);
  const [hasImage, setHasImage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [imgFromServer, setImgFromServer] = useState(true);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreProducto", currentId?.NombreProducto);
    setValue("PrecioProducto", currentId?.PrecioProducto);
    setValue("DescuentoProducto", currentId?.DescuentoProducto);
    setValue("CantidadProducto", currentId?.CantidadProducto);
    setValue("DescripcionProducto", currentId?.DescripcionProducto);
    setValue("CostoProducto", currentId?.CostoProducto);
    setValue("IdCategoriaProducto", currentId?.idCategoriaProducto);
    setImage(currentId?.ImagenProducto);
  }, []);

  const { addImageProduct, updateProduct } = useProducts();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ESTABLECEMOS LA IMAGEN SELECCIONADA EN EL INPUT FILE
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setHasImage(file);
      setShowError(false);
      setImgFromServer(false);
    }
  };
  const validateImage = handleSubmit(async (data) => {
    if (hasImage) {
      if (!hasImage.type.startsWith("image")) {
        handleResponseMessages({
          status: 404,
          data: "El archivo seleccionado no es una imagen, por favor, selecciona una imagen.",
        });
        return;
      }
      if (hasImage.size > 1000000) {
        handleResponseMessages({
          status: 404,
          data: "La imagen sobrepasa el tamaño máximo, por favor, selecciona una imagen diferente o comprime la imagen.",
        });
        return;
      }
    }
    handleUpdateProductImage(data);
  });
  const handleUpdateProductImage = async (dataProduct) => {
    dataProduct.ImagenProducto = hasImage ? hasImage.name : image;
    dataProduct.idProducto = currentId.idProducto;
    if (hasImage) {
      const formData = new FormData();
      formData.append("Imagen", hasImage);
      try {
        const res = await addImageProduct(formData);
        console.log(res);
        if (res.response) {
          const { status, data } = res.response;
          handleResponseMessages({ status, data });
        } else {
          dataProduct.updateImage = true;
          handleUpdateProduct(dataProduct);
        }
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    } else {
      dataProduct.updateImage = false;
      handleUpdateProduct(dataProduct);
    }
  };

  const handleUpdateProduct = async (dataProduct) => {
    try {
      const res = await updateProduct(dataProduct);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      handleResetValues();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const handleResetValues = () => {
    setGetCategoriesAndProductsAgain(!getCategoriesAndProductsAgain);
    setHasImage(null);
    setImgFromServer(true);
    setOptionSubMenu(0);
    reset();
  };

  return (
    <form
      onSubmit={validateImage}
      className="AdminAddProduct"
      encType="multipart/form-data"
    >
      <p className="AdminAddProduct__Title">
        Editando producto {currentId.NombreProducto}
      </p>
      <picture className="AdminAddProduct__Picture">
        <img
          src={imgFromServer ? `${HOST_IMG}/${image}` : image}
          alt="Agregar Imagen del Producto"
        />
      </picture>
      <p className="AdminAddProduct__Description">
        Por favor, selecciona una imagen en formato PNG, JPG o JPEG con un
        tamaño máximo de 2MB.
      </p>
      <label className="AdminAddProduct__File">
        <input
          type="file"
          accept="image/*"
          name="Imagen"
          onChange={handleFileChange}
        />
        {hasImage ? hasImage?.name : "Seleccionar Imagen"}
      </label>
      {showError && (
        <span className="AdminAddProduct__File--SmallError">
          ¡Por favor, selecciona una imagen! ⚠️
        </span>
      )}
      {dataAddProductInputsProps.map(
        ({ inputType, inputTitle, inputName, placeholder, validator }) => (
          <>
            {inputType === "text" ? (
              <div className="AdminAddProduct__ContainerInputs">
                <p className="AdminAddProduct__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <input
                  type="text"
                  {...register(inputName, validator)}
                  className="AdminAddProduct__ContainerInputs--Input"
                  placeholder={placeholder}
                />
              </div>
            ) : (
              <div className="AdminAddProduct__ContainerInputs">
                <p className="AdminAddProduct__ContainerInputs--Title">
                  {inputTitle}
                </p>
                <textarea
                  {...register(inputName, validator)}
                  className="AdminAddProduct__ContainerInputs--Input TextArea"
                  placeholder={placeholder}
                ></textarea>
              </div>
            )}
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <small
                    key={type}
                    className="AdminAddProduct__ContainerInputs--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <p className="AdminAddProduct__ContainerInputs--Title Select">
        Categoría del Producto
      </p>
      <select
        {...register("IdCategoriaProducto")}
        className="AdminAddProduct__ContainerInputs--Input"
      >
        {categoriesAndProducts.map(
          ({ idCategoriaProducto, NombreCategoria }, index) => (
            <option key={index} value={idCategoriaProducto}>
              {NombreCategoria}
            </option>
          )
        )}
      </select>
      <button type="submit" className="AddUsers__Button">
        Actualizar Producto
      </button>
    </form>
  );
}
