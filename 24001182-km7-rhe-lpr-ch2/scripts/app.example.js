class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();
    this.run();
  }

  run = () => {
    Car.list.forEach((car) => {
      this.carContainerElement.innerHTML += car.render();
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }
}
