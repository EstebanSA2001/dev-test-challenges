const API_URL = "https://api.github.com/users/";

function searchUser() {
  const username = document.getElementById("username").value;

  if (!username) return;

  fetch(API_URL + username)
    .then(res => res.json())
    .then(data => {
      if (data.message === "Not Found") {
        document.getElementById("result").innerText = "User not found";
        return;
      }

      const resultText = `Name: ${data.name}, Followers: ${data.followers}`;
      document.getElementById("result").innerText = resultText;

      saveToHistory(resultText);
      renderHistory();
    });
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(entry);
  localStorage.setItem("history", JSON.stringify(history));
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const list = document.getElementById("history");

  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

renderHistory();