const Distance = require('geo-distance');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

class RawQueries {
  static async findAllBrandName(limit, offset) {
    const monas = {
      lat: '106.8272404',
      lon: '-6.1755365'
    }

    const query = `
    SELECT "Brand"."id", "Brand"."name" AS "brandName",
    "Outlets"."name" AS "outletName",
    "Outlets"."address" AS "outletAddress",
    "Outlets"."longitude" AS "outletLongitude",
    "Outlets"."latitude" AS "outletLatitude",
    (SELECT COUNT(*) FROM "Products" AS "Products" WHERE "Brand"."id" = "Products"."BrandId") AS "totalProduct"
    FROM "Brands" AS "Brand"
    LEFT JOIN "Outlets" AS "Outlets"
    ON "Brand"."id" = "Outlets"."BrandId"
    ORDER BY "Brand"."id" ASC
    LIMIT ${limit} OFFSET ${offset}
    `
    let brands = await sequelize.query(query, { type: QueryTypes.SELECT });

    for (let brand of brands) {
      let location = {
        lat: brand.outletLatitude,
        lon: brand.outletLongitude
      }
      const monasToLocation = await Distance.between(monas, location);

      brand.distance = monasToLocation.human_readable();
      brand.distance.distance = parseFloat(brand.distance.distance);
    }
    
    brands = await brands.sort((a, b) => (a.distance.distance > b.distance.distance) ? 1 : ((b.distance.distance > a.distance.distance) ? -1 : 0))
    
    for (let brand of brands) {
      brand.distance = `${brand.distance.distance} ${brand.distance.unit}`
    }

    return brands;
  }
}

module.exports = RawQueries;