$("#select").val(localStorage.getItem("optionVal")); //local storage
const languageBtn = $(".LanguageBtn");
const mapping = {
  firstName: { path: "name.first", isVisible: true },
  lastName: { path: "name.last", isVisible: true },
  city: { path: "location.city", isVisible: true },
  address: { path: "location.street.name", isVisible: true },
  src: { path: "picture.large", isVisible: true },
  gender: { path: "gender", isVisible: true },
  email: { path: "email", isVisible: true },
  country: { path: "location.country", isVisible: true },
};

async function drawData() {
  try {
    const selectVal = localStorage.getItem("optionVal");
    var result = await getUsers({
      url: "./users.json",
    });
    const { results } = result;
    console.log(results);
    draw(results);
  } catch (error) {
    alert("CANT LOAD THE USERS ARRAY");
  }
}

function draw(arrOfObjects) {
  const mappedUsers = arrOfObjects.map((user) => {
    return getMappedUser(user);
  });
  const usersCard = drawCards(mappedUsers);
  console.log(usersCard);
  $("#container").append(usersCard);
}

function getMappedUser(user) {
  const keyValueMappingArray = Object.entries(mapping);
  return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY) => {
    const [key, settingObj] = KEYVALUEPAIR_ARRAY;
    const { path } = settingObj;
    return { ...mappedUser, [key]: getValueFromPath(path, user) };
  }, {});
}

function getValueFromPath(path, user) {
  const splittedPath = path.split(".");
  const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
    const isValueExist = currentUser[partOfPath];
    return isValueExist ? currentUser[partOfPath] : "Not Availble";
  }, user);
  return theRequestedValue;
}

drawData();

$("#select").on("change", () => {
  drawData();
  window.localStorage.setItem("optionVal", $("#select").val());
  console.log(localStorage.getItem("optionVal"));
});

function drawCards(users) {
  console.log(users);
  const cardsContainer = $("#container");
  users.forEach((user) => {
    const card = $(`<div class="card"></div>`);
    const img = $(`<img src=${user.src} alt="Avatar" style="width:100%">`);
    const dataContainer = $(`<div class="container"></div>`);
    const h4 = $(
      `<h4> <b>${user.firstName}  ${user.lastName}</b><br>  Gender:${user.gender} <br> city:${user.city}<br> Address: ${user.address}</h4>`
    );
    const email = $(`<p>${user.email}</p>`);
    const languageBtn = $(`<button>Language</button>`);

    languageBtn.on("click", async () => {
      try {
        const countryData = await getCountryData({
          url: `https://restcountries.eu/rest/v2/name/${user.country}`,
        });

        console.log(countryData);
      } catch (error) {
        alert("cant load country data");
      }
    });

    dataContainer.append(h4, email, languageBtn);
    card.append(img, dataContainer);

    cardsContainer.append(card);
  });
}

drawData();

// function _drawData(objects) {
//   const result = objects.results;
//   const tableBody = $("#TableBody");
//   result.forEach((user) => {
//     const tr = $("<tr></tr>");
//     const tdName = $(`<td><b>${user.first_name}</b></td>`);
//     const tdLastname = $(`<td>${user.last_name}</td>`);
//     const tdGender = $(`<td>${user.gender}</td>`);
//     const tdId = $(`<td>${user.id}</td>`);
//     const tdEmail = $(`<td>${user.email}</td>`);
//     const tdAddress = $(`<td>${user.address}</td>`);

//     tr.append(tdName, tdLastname, tdGender, tdId, tdEmail, tdAddress);
//     tableBody.append(tr);
//   });
//   return tableBody;
// }
