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
  return console.log("WE ARE IN");
}

drawData();
