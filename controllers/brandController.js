const { BrandRepository } = require('../repositories');

class BrandController {
  static async getBrand(req, res, next) {
    try {
      const response = await BrandRepository.findAll();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBrandName(req, res, next) {
    try {
      if (!req.query.limit || !req.query.offset) next({ name: 'CantFetchData' });

      const { limit, offset } = req.query;
      const response = await BrandRepository.findAllBrandName(limit, offset);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getBrandById(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const response = await BrandRepository.findBrandById(id);

      // Check if brand is exist
      if (!response) next({ name: 'ErrorNotFound' });
      else res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createBrand(req, res, next) {
    try {
      const data = req.body;

      // Check if the property of Brand is exist
      if (!('name' in data) || !('logo' in data) || !('banner' in data)) next({ name: 'IncompleteProperty' });
      // Check if the value of the property filled with empty string
      else if (data.name === '' || data.logo === '' || data.banner === '') next({ name: 'EmptyString' });
      // Check if the value of the property is null
      else if (!data.name || !data.logo || !data.banner) next({ name: 'FillInTheBlank' });
      
      const response = await BrandRepository.create(data);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBrand(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const data = req.body;

      let brand = await BrandRepository.findBrandById(id);

      // If brand is not found
      if (!brand) next({ name: 'ErrorNotFound' });
      // If the data that want to be updated is not complete, then it will use the current value of the property itself
      if (!('name' in data) || data.name === '') data.name = brand.name;
      if (!('logo' in data) || data.logo === '') data.logo = brand.logo;
      if (!('banner' in data) || data.banner === '') data.banner = brand.banner;
      
      const response = await BrandRepository.update(data, id);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBrand(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const brand = await BrandRepository.findBrandById(id);

      // If brand is not found
      if (!brand) next({ name: 'ErrorNotFound' });
      else {
        const response = await BrandRepository.delete(id);

        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BrandController;