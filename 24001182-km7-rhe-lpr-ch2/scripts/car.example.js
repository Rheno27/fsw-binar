class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-img-container p-3" style="height: 256px; overflow: hidden;">
            <img src="${this.image}" class="card-img-top img-fluid h-100 w-100 object-fit-cover" alt="${this.manufacture}">
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${this.model}/${this.type}</h6>
            <h5 class="card-subtitle mb-2 fw-bold">${this.rentPerDay}/ hari</h5>
            <p class="card-text flex-grow-1">${this.description}</p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-person me-2"></i>${this.capacity}</li>
              <li class="mb-2"><i class="bi bi-gear me-2"></i>${this.transmission}</li>
              <li class="mb-2"><i class="bi bi-calendar me-2"></i>${this.year}</li>
            </ul>
            <a href="#" class="btn btn-success w-100 mt-auto">Pilih Mobil</a>
          </div>
        </div>
      </div>
    `;
  }
}
