const { Product } = require('../models');

class ProductRepository {
  static findAll() {
    return Product.findAll({ order: [[ 'id', 'ASC' ]] });
  }

  static findProductById(id) {
    return Product.findOne({ where: { id } });
  }

  static create(product, brandId) {
    let data = product;
    data.BrandId = brandId;

    return Product.create(data);
  }

  static async update(product, id) {
    const data = await Product.update(product, { where: { id }, returning: true });
    return data[1][0];
  }

  static async delete(id) {
    await Product.destroy({ where: { id } });

    return { message: 'Product is successfully deleted' };
  }
}

module.exports = ProductRepository;