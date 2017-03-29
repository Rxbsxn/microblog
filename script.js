    const endpoint = 'https://gist.githubusercontent.com/Rxbsxn/be14a5dfdc70b77c2d84039b6c59cca3/raw/c64acbaa7b2ff27f3633a775e83dcb2f14da4c9a/.jsonhttps://gist.githubusercontent.com/Rxbsxn/be14a5dfdc70b77c2d84039b6c59cca3/raw/c64acbaa7b2ff27f3633a775e83dcb2f14da4c9a/.json';
    

    const addPosts = document.querySelector('.add-posts');
    const postsList = document.querySelector('.posts');
    const postsCount = document.querySelector('.posts-count');
    const posts = [];
    fetch(endpoint).then(obj => obj.json()).then(data => posts.push(...data));
    
    function addPost(e) {
      e.preventDefault();
      const text = this.querySelector('[name=post]').value;
      const post = {
        text,
        likes: 0
      };
      posts.push(post);
      showPosts(posts, postsList);
      alertify.success('Post created');
      this.reset();
    }

    function showPosts(postsArr = [], postsShow) {
      postsShow.innerHTML = postsArr.map((post, index) => {
        return `
        <li>
          
          <label for="item${index}" > Post: ${post.text } <br> Likes: ${post.likes}</label>
          <input type="button" data-index=${index} class="delete" value="Delete">
          <input type="button" data-index=${index} class="vote-up" value="+5">
          <input type="button" data-index=${index} class="vote-down" value="-10">

        </li>
      `;
      }).join('');
      postsCount.innerHTML = `Current number of posts: ${posts.length}`;
    }

    function deletePost(e) {
      if (!e.target.matches('.delete')) return;
      const el = e.target;
      const index = el.dataset.index;
      posts.splice(index, 1);
      showPosts(posts, postsList);
    }

    function vote(e) {
      if (e.target.matches('.vote-up')) {
        const el = e.target;
        const index = el.dataset.index;
        posts[index].likes += 5;
        showPosts(posts, postsList);
      } else if (e.target.matches('.vote-down')) {
        const el = e.target;
        const index = el.dataset.index;
        posts[index].likes -= 10;
        showPosts(posts, postsList);
      } else return;
    }

    addPosts.addEventListener('submit', addPost);
    postsList.addEventListener('click', deletePost);
    postsList.addEventListener('click', vote);
    showPosts(posts, postsList);