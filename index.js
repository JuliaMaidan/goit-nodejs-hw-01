const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.contactsList();
      return console.log(allContacts);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "remove":
      const updatedList = await contacts.removeContact(id);
      return console.log(updatedList);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
