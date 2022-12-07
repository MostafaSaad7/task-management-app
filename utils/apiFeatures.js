const e = require('express');

class APIFeatures {
  constructor(dbQuery, urlQuery) {
    this.dbQuery = dbQuery;
    this.urlQuery = urlQuery;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.urlQuery };
    const excludedField = ['page', 'sort', 'limit', 'fields']; // Fields handled
    excludedField.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    let sortBy = '-createdAt';
    if (this.urlQuery.sort) {
      sortBy = this.urlQuery.split(',').join(' ');
    }
    this.dbQuery = this.dbQuery.sort(sortBy);
    return this;
  }

  limitFields() {
    let fields = '-__v';
    if (this.urlQuery.field) {
      fields = this.urlQuery.fields.split(',').join(' ');
    }
    this.dbQuery = this.dbQuery.select(fields);
    return this;
  }

  paginate() {
    const pageNumber = Number(this.urlQuery.page) || 1;
    const pageLimit = Number(this.urlQuery.limit) || 100;
    const SkippedDocuments = (pageNumber - 1) * pageLimit;
    this.dbQuery = this.dbQuery.skip(SkippedDocuments).limit(pageLimit);
    return this;
  }
}

module.exports = APIFeatures;
