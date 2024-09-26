class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.searchForm = document.querySelector("form");
    this.searchButton = document.getElementById("cari");
  }

  async init() {
    await this.load();
    this.run();
    this.addEventListeners();
  }

  run = (filteredCars = Car.list) => {
    this.carContainerElement.innerHTML = "";
    filteredCars.forEach((car) => {
      this.carContainerElement.innerHTML += car.render();
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  addEventListeners() {
    this.searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.filterCars();
    });
  }

  filterCars() {
    const driver = document.getElementById("tipe-driver").value;
    const date = document.getElementById("tanggal").value;
    const time = document.getElementById("waktu").value;
    const capacity = document.getElementById("jumlah-penumpang").value;

    console.log("User Inputs:");
    console.log("Driver:", driver);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Capacity:", capacity);

    const filteredCars = Car.list.filter((car) => {
      const carDate = new Date(car.availableAt);
      const searchDate = new Date(`${date}T${time}`);
      
      // Ubah logika perbandingan driver di sini
      const driverMatch = (driver === "1" && car.available === true) || (driver === "2" && car.available === false);
      const dateMatch = carDate >= searchDate;
      const capacityMatch = capacity === "" || (car.capacity && car.capacity >= parseInt(capacity));

      console.log(`Car ${car.id} - Capacity: ${car.capacity}, Available: ${car.available}, Match: ${driverMatch}`);

      return driverMatch && dateMatch && capacityMatch;
    });

    console.log("Filtered Cars:", filteredCars);

    this.run(filteredCars);
  }
}
