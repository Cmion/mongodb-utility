const util = require('util');

export const logger = (query: any) => {
  console.log(util.inspect(query, false, null, true /* enable colors */));
};
