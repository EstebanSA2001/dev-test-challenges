// app.js

let cachedUser = null;

async function loadUser() {
  const userId = document.getElementById('userId').value;

 
  if (userId === '') {           
    showResult('Please enter a valid ID');
    return;
  }

  if (userId <= 0) {  
    showResult('ID must be positive', true);
    return;
  }

  
  if (!cachedUser || cachedUser.id !== userId) {
    cachedUser = await fetchUser(userId);  
  }

    const user = cachedUser;

    const result = document.getElementById('result');
    result.innerHTML = '';

    const name = document.createElement('strong');
    name.textContent = user.name;

    result.appendChild(name);
    result.appendChild(document.createElement('br'));
    result.appendChild(document.createTextNode(user.email));
    result.appendChild(document.createElement('br'));
    result.appendChild(document.createTextNode(user.website));

}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
