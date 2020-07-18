async function drawData() {
  try {
    const result = await $.ajax({
      url:
        "https://gorest.co.in/public-api/users?_format=json&access-token=TCCLGqkQi-iO6ptX2j-ZfvNvLqvGE7p7R9xC",
      method: "GET",
      success: function (results) {
        return _drawData(results);
      },
    });
    console.log(result);
  } catch (error) {
    alert("ERROR");
  }
}

function _drawData(objects) {
  const result = objects.result;
  const tableBody = $("#TableBody");
  result.forEach((user) => {
    const tr = $("<tr></tr>");
    const tdName = $(`<td><b>${user.first_name}</b></td>`);
    const tdLastname = $(`<td>${user.last_name}</td>`);
    const tdGender = $(`<td>${user.gender}</td>`);
    const tdId = $(`<td>${user.id}</td>`);
    const tdEmail = $(`<td>${user.email}</td>`);
    const tdAddress = $(`<td>${user.address}</td>`);

    tr.append(tdName, tdLastname, tdGender, tdId, tdEmail, tdAddress);
    tableBody.append(tr);
  });
  return tableBody;
}

drawData();
