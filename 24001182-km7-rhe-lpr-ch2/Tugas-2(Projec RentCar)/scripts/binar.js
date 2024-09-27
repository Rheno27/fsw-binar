class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const timeAt = new Date();
      const oneWeekLater = new Date(timeAt.getTime() + 7 * 24 * 60 * 60 * 1000); // Ketersediaan nya hanya untuk hari
      // Menggunakan Math.random() untuk menghasilkan waktu acak yang unik untuk setiap mobil
      const availableAt = new Date(timeAt.getTime() + Math.random() * (oneWeekLater.getTime() - timeAt.getTime()));

      return {
        ...car,
        availableAt,
      };
    })
  }

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cacheCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body)

      localStorage.setItem("CARS", JSON.stringify(cars));
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}
