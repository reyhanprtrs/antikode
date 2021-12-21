const { Brand } = require('../models');
const RawQueries = require('./SQL');

class BrandRepository {
  static findAll() {
    return Brand.findAll({ order: [[ 'id', 'ASC' ]] });
  }

  static findAllBrandName(limit, offset) {
    return RawQueries.findAllBrandName(limit, offset);
  }

  static findBrandById(id) {
    return Brand.findOne({ where: { id } });
  }

  static create(brand) {
    return Brand.create(brand);
  }

  static async update(brand, id) {
    const data = await Brand.update(brand, { where: { id }, returning: true });
    return data[1][0];
  }

  static async delete(id) {
    await Brand.destroy({ where: { id } });
    return { message: 'Brand is successfully deleted' };
  }
}

module.exports = BrandRepository;