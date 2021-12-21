const { BrandRepository, ProductRepository } = require('../repositories');

class ProductController {
  static async findAll(req, res, next) {
    try {
      const response = await ProductRepository.findAll();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findProductById(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const response = await ProductRepository.findProductById(id);

      // Check if product is exist
      if (!response) next({ name: 'ErrorNotFound' });
      else res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const data = req.body;
      const brandId = req.query.brandId ? parseInt(req.query.brandId) : null;

      // Check if brand ID is included in query params
      if (!brandId) next({ name: 'RequiredBrandID' });

      const findBrand = await BrandRepository.findBrandById(brandId);

      // Check if brand is exist
      if (!findBrand) next({ name: 'BrandIsNotExist' });

      // Check if the property of Product is exist
      if (
        !('name' in data) 
        || !('picture' in data) 
        || !('price' in data)
      ) next({ name: 'IncompleteProperty' });
      // Check if the value of the property filled with empty string
      else if (
        data.name === '' 
        || data.picture === '' 
        || data.price === ''
      ) next({ name: 'EmptyString' });
      // Check if the value of the property is null, picture can be null. It can be uploaded later
      else if (
        !data.name 
        || !data.price
      ) next({ name: 'FillInTheBlank' });

      const response = await ProductRepository.create(data, brandId);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
       // Check if ID is included
       if (!req.params.id) next({ name: 'IncludeID' });

       const { id } = req.params;
       const data = req.body;
 
       let product = await ProductRepository.findProductById(id);
 
       // If product is not found
       if (!product) next({ name: 'ErrorNotFound' });
       // If the data that want to be updated is not complete, then it will use the current value of the property itself
       if (!('name' in data) || data.name === '') data.name = product.name;
       if (!('picture' in data) || data.picture === '') data.picture = product.picture;
       if (!('price' in data) || data.price === '') data.price = product.price;
       
       const response = await ProductRepository.update(data, id);
 
       res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const product = await ProductRepository.findProductById(id);

      // If product is not found
      if (!product) next({ name: 'ErrorNotFound' });
      else {
        const response = await ProductRepository.delete(id);

        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;