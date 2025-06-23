// Displaying all post titles and images function
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => {
      // clearing all previous posts
      const postList = document.getElementById("news-list");
      postList.innerHTML = "";

      // Sorting posts by date
      const classifiedPosts = posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      if (classifiedPosts.length > 0) {
        displayPostDetails(classifiedPosts[0]);
      }
      //  Looping through posts
      classifiedPosts.forEach((post) => {
        // Creating div for each post
        const postDiv = document.createElement("div");
        postDiv.classList.add("news-item");

        // Formatting the date for the news posts
        const newsDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        //  Showing title and author in innerhtml
        postDiv.innerHTML = `
            <h3 class="post-title" data-id="${post.id}" >${post.title}</h3>
            <p > By ${post.author} ,  posted on ${newsDate}  </p>
          <hr />
        `;

        //  Adding click event to the title
        const titleEl = postDiv.querySelector(".post-title");
        titleEl.addEventListener("click", () => handlePostClick(post.id));

        postList.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

// sending click Get request
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

// Display post details in the #news-detail section when you click post title
function displayPostDetails(post) {
  const postDetail = document.getElementById("news-detail");
  postDetail.innerHTML = `
         <h2>${post.title}</h2>
        <p>By Global Insight News<span style="display: inline-block; margin-left: 40%; font-style: italic;">
         ${post.category}</span></p>
         <img src="${post.imageUrl}" alt="${post.title}" style="width:100%;max-width:488px;
          height:325px; object-fit:cover;"/>
          <p>${post.content}</p>
          <button id="edit-btn">Edit</button>
          <button id="del-btn">Delete</button>
     `;
  //  Event listeners
  document
    .getElementById("edit-btn")
    .addEventListener("click", () => showEditForm(post));
  document
    .getElementById("del-btn")
    .addEventListener("click", () => deletePost(post.id));
}

//  Edit post title and content
function showEditForm(post) {
  const postDetail = document.getElementById("news-detail");

  postDetail.innerHTML = `
    <form id="edit-post-form">
      <h2>Edit Post</h2>
      <input type="text" id="edit-title" value="${post.title}" required /><br><br>
      <textarea id="edit-content" required>${post.content}</textarea><br><br>
      <button type="submit">Save Changes</button>
      <button type="button" id="cancel-edit">Cancel</button>
    </form>
  `;

  document
    .getElementById("edit-post-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const newTitle = document.getElementById("edit-title").value;
      const newContent = document.getElementById("edit-content").value;

      // Send PATCH request to backend
      fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
        }),
      })
        .then((res) => res.json())
        .then((updatedPost) => {
          // Update frontend with new data
          displayPosts();
          displayPostDetails(updatedPost);
        })
        .catch((err) => {
          console.error("Error updating post:", err);
          alert("Failed to update the post.");
        });
    });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    displayPostDetails(post);
  });
}

// Delete post function
function deletePost(postId) {
  // Confirm before deleting
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (!confirmed) return;

  // DELETE request to backend
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete from server");

      //  Remove from frontend after success
      const postList = document.getElementById("news-list");
      const postItem = postList
        .querySelector(`[data-id='${postId}']`)
        ?.closest(".news-item");
      if (postItem) postItem.remove();

      const postDetail = document.getElementById("news-detail");
      postDetail.innerHTML = `<p style="font-style:italic; color:gray;">Post deleted. Select another from the list.</p>`;
    })
    .catch((err) => {
      console.error("Error deleting post:", err);
      alert("Something went wrong while deleting the post.");
    });
}

// Setting up a form submission listener
function addNewPostListener() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collecting form data
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

    // Sending new POST to the server
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
