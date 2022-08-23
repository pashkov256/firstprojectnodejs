const createPath = require("../helpers/create-path");
const Contacts = require("../models/contact");

const getContacts = (req, res) => {
  const title = "Contacts";

  Contacts.find()
    .then((contacts) => {
      console.log(contacts);
      res.render(createPath("contacts"), { contacts, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

module.exports = { getContacts };
