class APIFeatures {
  constructor(querryData, querryParams) {
    this.querryData = querryData;
    this.querryParams = querryParams;
  }
  sort() {}
  filter() {}
  pagination() {
    const page = this.querryParams.page * 1 || 1;
    const limit = this.querryParams.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.querryData = this.querryData.skip(skip).limit(limit);
    return this;
  }
}
