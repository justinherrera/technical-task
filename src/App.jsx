import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

function App() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/cars');
      const data = await response.json();
      setCars(data);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCars = currentItems.filter((car) => {
    return (
      car.vin.includes(searchTerm) ||
      car.year.includes(searchTerm) ||
      car.make.toUpperCase().includes(searchTerm.toUpperCase()) ||
      car.model.toUpperCase().includes(searchTerm.toUpperCase())
    );
  });

  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-10 px-8 w-auto">
      <input
        type="text"
        className="p-2 rounded w-[50%] border"
        placeholder="Search by VIN, Year, Make or Model"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="flex flex-row flex-wrap mb-10 justify-center">
        {
          filteredCars.map((car) => (
            <div className="m-2 border-2 flex flex-col items-center" key={car.id}>
              <img className="rounded-t-lg h-44" src={car.img} />
              <div className="p-5">
                <h5 class="mb-2 text-2xl font-bold">{car.make} {car.model} ({car.year})</h5>
                ₱{car.price}
              </div>
              {/* {car.year} {car.make} {car.model} ({car.vin}) */}
            </div>
          ))
        }
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App
