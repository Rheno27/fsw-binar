class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.searchForm = document.querySelector("form");
    this.searchButton = document.getElementById("cari");
  }

  async init() {
    await this.load();
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

    // Reset previous error messages
    document.getElementById("tipe-driver-error").textContent = "";
    document.getElementById("tanggal-error").textContent = "";
    document.getElementById("waktu-error").textContent = "";
    document.getElementById("jumlah-penumpang-error").textContent = "";

    let isValid = true;

    // Validasi tanggal
    if (date) {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      const sevenDaysLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      if (selectedDate > sevenDaysLater) {
        document.getElementById("tanggal-error").textContent = "Ketersediaan mobil hanya diupdate untuk 7 hari ke depan dari hari ini";
        isValid = false;
      }
    } else {
      document.getElementById("tanggal-error").textContent = "Mohon isi tanggal";
      isValid = false;
    }

    if (!driver) {
      document.getElementById("tipe-driver-error").textContent = "Mohon pilih tipe driver";
      isValid = false;
    }
    if (!time) {
      document.getElementById("waktu-error").textContent = "Mohon isi waktu";
      isValid = false;
    }
    if (capacity && (parseInt(capacity) < 1 || isNaN(parseInt(capacity)))) {
      document.getElementById("jumlah-penumpang-error").textContent = "Jumlah penumpang harus minimal 1";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const filteredCars = Car.list.filter((car) => {
      const carDate = new Date(car.availableAt);
      const searchDate = new Date(`${date}T${time}`);
      
      const driverMatch = (driver === "1" && car.available === true) || (driver === "2" && car.available === false);
      const dateMatch = carDate >= searchDate;
      const capacityMatch = !capacity || (car.capacity && car.capacity >= parseInt(capacity));

      return driverMatch && dateMatch && capacityMatch;
    });

    this.run(filteredCars);
  }
}
