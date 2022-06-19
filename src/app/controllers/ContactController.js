const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    return response.status(200).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not fount!' });
    }

    response.status(200).json(contact);
  }

  store() {}

  update() {}

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not fount!' });
    }

    await ContactsRepository.delete(id);

    // 204: success without content
    response.sendStatus(204);
  }
}

// singleton - ter apenas uma instância de uma classe na aplicação
module.exports = new ContactController();
