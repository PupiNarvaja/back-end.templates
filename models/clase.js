const fs = require('fs').promises;
const path = require('path');

class Contenedor {
  constructor() {
    this.path = path.join(__dirname, '../database/products.json')
  }

  async getProdById(id) {
    const data = await this.readData()
    const product = data.find(prod => prod.id == id)
    if (!product) {
      throw new Error('product not found')
    }
    return product
  }

  async add(prod) {
    const data = await this.readData()
    const id = data[data.length - 1] ? data[data.length - 1].id : 0
    prod.id = id + 1
    data.push(prod)
    await this.writeData(data)
  }

  async getAll() {
    return this.readData()
  }

  writeData(data) {
    return fs.writeFile(this.path, JSON.stringify(data, null, 2))
  }

  async readData () {
    const raw = await fs.readFile(this.path, "utf8")
    return JSON.parse(raw)
  }
}

module.exports = Contenedor;