const cards = document.getElementById('cards');

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
  const cardList = contacts.map(
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

// fetchContacts();
generateContactsCard();
// fetchContacts().then((contacts) => console.log(contacts));
