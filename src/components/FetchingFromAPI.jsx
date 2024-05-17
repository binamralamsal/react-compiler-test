import { useEffect, useState } from "react";

export function FetchingFromAPI() {
  // Since we know that the data coming from the API will be json, we are making it an array.
  const [posts, setPosts] = useState([]);
  // to handle error and loading state, we can do this:
  // this is in loading state initially since data won't be fetched initially.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // You can use .then() and .catch() like this.
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => res.json())
    //   .then((data) => setPosts(data))
    //   .catch(console.log);
    // or you can use async await too, but you can't use async await directly.
    // because for that we have to make this function asynchronous and useEffect will
    // complain if we try to do so.
    // instead we can define an asynchronous function inside useEffect
    // async function fetchPosts() {
    //   try {
    //     const response = await fetch(
    //       "https://jsonplaceholder.typicode.com/posts"
    //     );
    //     const posts = await response.json();
    //     setPosts(posts);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchPosts();
    // both of these methods are correct and choose what you prefer
    // it entirely depends upon developers to developers

    // you can also move it outside of useeffect if you want
    async function fetchPosts() {
      try {
        // if for some reason, this fetchPosts runs again then again it will start to fetch data
        // so we are setting isLoading to true
        setIsLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Something happened");
        const posts = await response.json();

        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        // it is wrong to show loading bar when there is an error, so we are turning it off.
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error occured! {error}</h1>;

  return (
    <div>
      <h1>Posts ({posts.length})</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title} </li>
        ))}
      </ul>
    </div>
  );
}
