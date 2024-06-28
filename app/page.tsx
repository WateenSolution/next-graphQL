// app/page.tsx
import { gql } from "@apollo/client";
import client from "./lib/apolloClient";

const POSTS_QUERY = gql`
  query {
    posts {
      userId
      id
      title
      body
    }
  }
`;

const COMMENTS_QUERY = gql`
  query {
    comments {
      postId
      id
      name
      email
      body
    }
  }
`;

const Home = async () => {
  const postsPromise = client.query({ query: POSTS_QUERY });
  const commentsPromise = client.query({ query: COMMENTS_QUERY });

  const [{ data: postsData }, { data: commentsData }] = await Promise.all([
    postsPromise,
    commentsPromise,
  ]);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {postsData?.posts.map((post: any) => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.body}
          </li>
        ))}
      </ul>
      <h1>Comments</h1>
      <ul>
        {commentsData?.comments?.map((comment: any) => (
          <li key={comment?.id}>
            <strong>{comment?.name}</strong> - {comment?.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
