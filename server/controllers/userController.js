exports.userController = {
  async getWardrobes() {
    console.log(`${this.req}`);
  },
  async addWardrobe() {
    console.log(`${this.req.params.wardrobeName}`);
  },

  async updateWardrobe() {
    console.log(`${this.req.params.newname}`);
  },
  async deleteWardrobe() {
    console.log(`${this.req.params.wardrobename}`);
  },
};
