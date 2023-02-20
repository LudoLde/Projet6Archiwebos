const connexion = document.querySelector(".connect");
connexion.addEventListener("click", clickLogin);

async function clickLogin(e) {
   e.preventDefault();
   let inputMail = document.getElementById("email").value;
   let inputMdp = document.getElementById("mdp").value;
   const user = {
      email: inputMail,
      password: inputMdp,
   };

   let response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
   });

   let result = await response.json();
   if (response.status == 200) {
      console.log(result.token);
      console.log(response);
      window.location.href = "index.html";
   }
   if (response.status == 401 || response.status == 404) {
      alert("Problème identifiants");
   }
}
