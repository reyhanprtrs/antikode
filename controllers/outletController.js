const { BrandRepository, OutletRepository } = require('../repositories');

class OutletController {
  static async findAll(req, res, next) {
    try {
      const response = await OutletRepository.findAll();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findOutletById(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const response = await OutletRepository.findOutletById(id);

      // Check if outlet is exist
      if (!response) next({ name: 'ErrorNotFound' });
      else res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createOutlet(req, res, next) {
    try {
      const data = req.body;
      const brandId = req.query.brandId ? parseInt(req.query.brandId) : null;

      // Check if brand ID is included in query params
      if (!brandId) next({ name: 'RequiredBrandID' });

      const findBrand = await BrandRepository.findBrandById(brandId);

      // Check if brand is exist
      if (!findBrand) next({ name: 'BrandIsNotExist' });

      // Check if the property of Outlet is exist
      if (
        !('name' in data) 
        || !('picture' in data) 
        || !('address' in data)
        || !('longitude' in data)
        || !('latitude' in data)
      ) next({ name: 'IncompleteProperty' });
      // Check if the value of the property filled with empty string
      else if (
        data.name === '' 
        || data.picture === '' 
        || data.address === ''
        || data.longitude === '' 
        || data.latitude === ''
      ) next({ name: 'EmptyString' });
      // Check if the value of the property is null, picture can be null. It can be uploaded later
      else if (
        !data.name 
        || !data.address 
        || !data.longitude
        || !data.latitude
      ) next({ name: 'FillInTheBlank' });

      const response = await OutletRepository.create(data, brandId);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateOutlet(req, res, next) {
    try {
       // Check if ID is included
       if (!req.params.id) next({ name: 'IncludeID' });

       const { id } = req.params;
       const data = req.body;
 
       let outlet = await OutletRepository.findOutletById(id);
 
       // If outlet is not found
       if (!outlet) next({ name: 'ErrorNotFound' });
       // If the data that want to be updated is not complete, then it will use the current value of the property itself
       if (!('name' in data) || data.name === '') data.name = outlet.name;
       if (!('picture' in data) || data.picture === '') data.picture = outlet.picture;
       if (!('address' in data) || data.address === '') data.address = outlet.address;
       if (!('longitude' in data) || data.longitude === '') data.longitude = outlet.longitude;
       if (!('latitude' in data) || data.latitude === '') data.latitude = outlet.latitude;
       
       const response = await OutletRepository.update(data, id);
 
       res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOutlet(req, res, next) {
    try {
      // Check if ID is included
      if (!req.params.id) next({ name: 'IncludeID' });

      const { id } = req.params;
      const outlet = await OutletRepository.findOutletById(id);

      // If outlet is not found
      if (!outlet) next({ name: 'ErrorNotFound' });
      else {
        const response = await OutletRepository.delete(id);

        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OutletController;