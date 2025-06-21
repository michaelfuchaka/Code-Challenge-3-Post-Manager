// Displaying all post titles and images function
function displayPosts(){
    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(post =>{

    // clearing all previous posts
        const postList = document.getElementById("news-list");
        postList.innerHTML = '';

    // Creating div for each post
        post.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('news-item');

    // Adding date for the news posts
        const newsDate = new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
          });

            postDiv.innerHTML = `
            <h3>${post["Blog-Title"]}</h3>
            <img src="${post.imageUrl}" alt="${post["Blog-Title"]}" width="500" />
           <p> ${post.category}</p>
           <p> ${newsDate}</p>
           <p> ${post.content}</p>
            <p> By ${post.author}</p>
          <hr />
        `;
            postList.appendChild(postDiv);
        });
        
    })
  .catch(error => {
        console.error("Error fetching posts:", error);
      });
}

document.addEventListener("DOMContentLoaded", () => {
    displayPosts();
});