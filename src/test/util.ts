/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const mongooseModel = () => {
  return {
    async create() {},
    async insertMany() {},
    async find() {},
    async findOne() {},
    async findById() {},
    async update() {},
    async updateOne() {},
    async updateMany() {},
    async deleteOne() {},
    async deleteMany() {},
    async populate() {},
    async aggregate() {},
    async count() {},
    async countDocuments() {}
  };
};

export const mongoObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
		'xxxxxxxxxxxxxxxx'
		  .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
		  .toLowerCase()
  );
};
