const cards = document.getElementById("cards");
const links = document.getElementById("links");
const form = document.querySelector("form");

/**
 *
 * Anonymous function: fetch the cleaned contact list
 * from the endpoint: /contacts.
 *
 */
const fetchContacts = async () => {
  const response = await fetch("http://localhost:3000/contacts", {
    method: "GET",
  });

  const data = await response.json();
  return data;
};

/**
 *
 * Anonymous function: format the list with the html + css.
 *
 */
const generateContactsCard = async (minNum, maxNum) => {
  // fetch the contacts using the fetch API:
  const contacts = await fetchContacts();

  // use the minNum and maxNum to retrieve a range of objects from the contacts array:
  const contactsRange = contacts.slice(minNum, maxNum);

  let htmlStr = "";
  // map through the contacts array and generate the cards:
  contactsRange.map(
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

  let htmlStr = "";
  for (let i = 0; i < numOfButtons; i++) {
    // onclick added to find the button number and apply a rule for a certain range of user:
    htmlStr += `<li><a id='${i + 1}' onclick='onSelect(id)'>${i + 1}</a></li>`;
  }

  // display the cards:
  links.innerHTML = htmlStr;
};

/**
 *
 * Calculate the range of user to displpay, based on the
 * link clicked on the paginator
 *
 */
const calcRange = (btnNumber) => {
  return [(btnNumber - 1) * 10, btnNumber * 10 - 1];
};

/**
 *
 * Event that receives the btn id and refresh the display
 *
 */
const onSelect = (id) => {
  numRange = calcRange(id);
  // console.log(numRange[0], numRange[1]);
  generateContactsCard(numRange[0], numRange[1]);
};

/**
 *
 * Application per se:
 *
 */
generateContactsCard(0, 9);
generatePaginationLinks(10);
