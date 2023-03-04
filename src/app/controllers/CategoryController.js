const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required!' });
    }

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Category not fount!' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'category not found!' });
    }

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Category not fount!' });
    }

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Category not fount!' });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'category not found!' });
    }

    const categoryUpdated = await CategoriesRepository.update(id, { name });

    response.json(categoryUpdated);
  }
}

module.exports = new CategoryController();
