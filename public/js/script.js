const cards = document.getElementById('cards');
const links = document.getElementById('links');

/**
 *
 * Anonymous function: fetch the cleaned contact list
 * from the endpoint: /contacts.
 *
 */
const fetchContacts = async () => {
  const response = await fetch('http://localhost:3000/contacts', {
    method: 'GET',
  });

  const data = await response.json();
  return data;
};

/**
 *
 * Anonymous function: format the list with the html + css.
 *
 */
const generateContactsCard = async () => {
  // fetch the contacts using the fetch API:
  const contacts = await fetchContacts();
  let htmlStr = '';
  // map through the contacts array and generate the cards:
  contacts.map(
    (contact) =>
      (htmlStr += `<li class='contact-item cf'>
            <div class='contact-details'>
              <img class='avatar' src='${contact.src}' />
              <h3>${contact.name}</h3>
              <span class='email'>${contact.email}</span>
            </div>
            <div class='joined-details'>
              <span class='date'>${contact.joined}</span>
            </div>
        </li>`)
  );

  // display the cards:
  cards.innerHTML = htmlStr;
};

/**
 *
 * Anonymous function: format the list with the html + css.
 *
 */
const generatePaginationLinks = async () => {
  // fetch the contacts using the fetch API:
  const contacts = await fetchContacts();
  // get the total num of contacts and the max user per page:
  const totalNumOfContacts = contacts.length;
  const totalNumOfContactsPerPage = 10;
  const numOfButtons = Math.ceil(
    totalNumOfContacts / totalNumOfContactsPerPage
  );

  let htmlStr = '';
  for (let i = 0; i < numOfButtons; i++) {
    htmlStr += `<li><a>${i + 1}</a></li>`;
  }

  // display the cards:
  links.innerHTML = htmlStr;
};

/**
 *
 * Application per se:
 *
 */
generateContactsCard();
generatePaginationLinks();
