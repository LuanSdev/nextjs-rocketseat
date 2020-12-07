import { GetStaticPaths, GetStaticProps } from "next";

export default function Member({ user }) {
  return <div>
    <img src={user.avatar_url} alt={user.name} width={80} style={{ borderRadius: '50%' }} />
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { login } = context.params;

  const response = await fetch(`https://api.github.com/users/${login}`);

  const data = await response.json()

  return {
    props: {
      user: data
    }
  }
}
