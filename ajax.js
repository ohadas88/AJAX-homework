function getApi() {
  return $.ajax({
    url:
      "https://gorest.co.in/public-api/users?_format=json&access-token=TCCLGqkQi-iO6ptX2j-ZfvNvLqvGE7p7R9xC",
    method: "GET",
    success: function (results) {
      return drawData(results);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("ERROR!");
    },
  });
}
