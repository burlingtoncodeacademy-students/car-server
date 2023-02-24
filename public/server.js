let form = document.querySelector(".form-container");

form.addEventListener("submit", async (event) => {
  // prevents form default behavior of:
  // page refresh & http being sent
  try {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    //   ! Define the url that you are trying to reach
    const url = "http://127.0.0.1:4000/user/register";
    //   ! Define the headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //   ! Create a variable called data: you will need to stringify the data

    const data = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    //   ! Create our request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };

    // ! Conduct the Fetch
    const response = await fetch(url, requestOptions);
    const json = await response.json();

    console.log(json);
  } catch (err) {
    console.error(err);
  }
});
