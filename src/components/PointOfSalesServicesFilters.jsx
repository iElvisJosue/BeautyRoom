/* eslint-disable react/prop-types */
export default function PointOfSalesProductsFilters({
  Content,
  setUseFilter,
  setFilter,
}) {
  const handleCategory = (idServicio) => {
    setFilter({ filter: idServicio });
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
      {Content.map(({ idServicio, NombreServicio }, index) => (
        <button
          className="PointOfSalesProducts__Filters--Button"
          key={index}
          onClick={() => handleCategory(idServicio)}
        >
          {NombreServicio}
        </button>
      ))}
    </section>
  );
}
