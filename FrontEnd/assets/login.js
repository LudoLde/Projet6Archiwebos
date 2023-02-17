const connexion = document.querySelector(".connect");
connexion.addEventListener("click", clickLogin);

function clickLogin(e) {
   e.preventDefault();
   let inputMail = document.getElementById("email").value;
   let inputMdp = document.getElementById("mdp").value;
   const user = {
      email: inputMail,
      password: inputMdp,
   };

   fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
   })
      .then((response) => response.json())
      .then((result) => console.log(result));
}
