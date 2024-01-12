document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
        searchGitHubUsers(searchTerm);
      }
    });
  
    async function searchGitHubUsers(username) {
      const userResponse = await fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      if (userResponse.ok) {
        const userData = await userResponse.json();
        displayUserResults(userData.items);
      } else {
        console.error('Error fetching GitHub users');
      }
    }
  
    function displayUserResults(users) {
      // Clear previous results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      // Display user information in the DOM
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user.login;
        userItem.addEventListener('click', function () {
          getUserRepositories(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    async function getUserRepositories(username) {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        displayUserRepositories(reposData);
      } else {
        console.error('Error fetching user repositories');
      }
    }
  
    function displayUserRepositories(repositories) {
      // Clear previous results
      reposList.innerHTML = '';
  
      // Display repositories in the DOM
      repositories.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
    }
  });
  