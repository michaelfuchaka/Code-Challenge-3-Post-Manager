// Displaying all post titles and images function
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => {
      // clearing all previous posts
      const postList = document.getElementById("news-list");
      postList.innerHTML = "";

      // Creating div for each post
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("news-item");

        // Adding date for the news posts
        const newsDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        postDiv.innerHTML = `
            <h3 class="post-title" data-id="${post.id}" >${post.title}</h3>
           <p> ${post.category}</p>
           <p> ${newsDate}</p>
            <p > By ${post.author}</p>
          <hr />
        `;

        // Add click listener to title
        const titleEl = postDiv.querySelector(".post-title");
        titleEl.addEventListener("click", () => handlePostClick(post.id));

        postList.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}


      function handlePostClick(postId) {
          fetch(`http://localhost:3000/posts/${postId}`)
          .then((res) => res.json())
        .then((post) => {
        displayPostDetails(post);
      })
      .catch((err) => {
      console.error("Error fetching post detail:", err);
    });
}



// Render post details in the #news-detail section
       function displayPostDetails(post) {
      const postDetail = document.getElementById("news-detail");
       postDetail.innerHTML = `
         <h2>${post.title}</h2>
         <p><strong>Author:</strong> ${post.author}</p>
         <img src="${post.imageUrl}" alt="${post.title}" width="500" />
          <p><strong>Content:</strong> ${post.content}</p>
  `;
}

          
    function addNewPostListener() {
    const form = document.getElementById("new-post-form");

       form.addEventListener("submit", (e) => {
        e.preventDefault();

         const title = document.getElementById("new-title").value;
         const author = document.getElementById("new-author").value;
         const category = document.getElementById("new-category").value;
         const imageUrl = document.getElementById("imageUrl").value;
         const content = document.getElementById("new-content").value;
         const date = new Date().toISOString();

        const newPost = {
          title,
        author,
            category,
      imageUrl,
      content,
      date,
    };

    // POST to the server
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((savedPost) => {
        // Optionally display post immediately
        displayPosts(); 
        form.reset();   
      })
      .catch((err) => {
        console.error("Error saving post:", err);
      });
  });
}   

  document.addEventListener("DOMContentLoaded", () => {
    displayPosts();
    addNewPostListener();
});

