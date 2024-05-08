/* eslint-disable react/prop-types */
export default function PointOfSalesProductsFilters({
  Content,
  setUseFilter,
  setFilter,
}) {
  const handleCategory = (idCategoriaProducto) => {
    setFilter({ filter: idCategoriaProducto });
    setUseFilter(true);
  };

  const handleFilter = () => {
    setUseFilter(false);
  };

  return (
    <section className="PointOfSalesProducts__Filters">
      <button
        className="PointOfSalesProducts__Filters--Button"
        onClick={handleFilter}
      >
        Todos <ion-icon name="options-outline"></ion-icon>
      </button>
      {Content.map(({ idCategoriaProducto, NombreCategoria }, index) => (
        <button
          className="PointOfSalesProducts__Filters--Button"
          key={index}
          onClick={() => handleCategory(idCategoriaProducto)}
        >
          {NombreCategoria}
        </button>
      ))}
    </section>
  );
}
