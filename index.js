const { Command } = require('commander');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      if (!id) return console.warn('invalid id');

      getContactById(id);
      break;

    case 'add':
      if (!name || !email || !phone)
        return console.warn('please enter all field');

      addContact(name, email, phone);
      break;

    case 'remove':
      if (!id) return console.warn('invalid id');

      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
