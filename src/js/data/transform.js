import { addressAsString } from '../utils/string';
import { retrieve } from '../utils/storage';

export const transform = () => {
  const rawData = retrieve('data');
  const config = retrieve('config');

  const geocodingFields = config.fields.geocoding;
  const dataFields = config.fields.data;

  return rawData.map(d => {
    let addressObject = {
      address: d[geocodingFields.address],
      city: d[geocodingFields.city],
      province: d[geocodingFields.province],
      postalCode: d[geocodingFields.postalCode],
      country: d[geocodingFields.country]
    };
    let addressString = addressAsString(addressObject);

    let data = {};
    dataFields.forEach(f => data[f] = d[f]);

    return {
      addressObject,
      addressString,
      data
    };
  });
};
