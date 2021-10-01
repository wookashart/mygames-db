/* eslint-disable @typescript-eslint/no-var-requires */
const connection = require('../database/connection');

const queryPromise = queryString =>
  new Promise(resolve => {
    connection.query(queryString, (err, rows) => {
      resolve({ err, rows });
    });
  });

const compareTags = (a, b) => {
  if ( a.tag_name < b.tag_name ){
    return -1;
  }
  if ( a.tag_name > b.tag_name ){
    return 1;
  }
  return 0;
}

module.exports = {
  queryPromise,
  compareTags
};