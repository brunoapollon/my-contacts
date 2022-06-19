const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Bruno',
    email: 'bruno@bruno.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'ari',
    email: 'ari@ari.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const contact = contacts.find((contactElement) => contactElement.id === id);
      resolve(contact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const contact = contacts.find((contactElement) => contactElement.email === email);
      resolve(contact);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      contacts = contacts.filter((contactElement) => contactElement.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve, reject) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve, reject) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updateContact : contact));

      resolve(updateContact);
    });
  }
}

module.exports = new ContactsRepository();
