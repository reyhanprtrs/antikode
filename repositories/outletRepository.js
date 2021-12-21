const { Outlet } = require('../models');

class OutletRepository {
  static findAll() {
    return Outlet.findAll({ order: [[ 'id', 'ASC' ]] });
  }

  static findOutletById(id) {
    return Outlet.findOne({ where: { id } });
  }

  static create(outlet, brandId) {
    let data = outlet;
    data.BrandId = brandId;

    return Outlet.create(data);
  }

  static async update(outlet, id) {
    const data = await Outlet.update(outlet, { where: { id }, returning: true });
    return data[1][0];
  }

  static async delete(id) {
    await Outlet.destroy({ where: { id } });

    return { message: 'Outlet is successfully deleted' };
  }
}

module.exports = OutletRepository;