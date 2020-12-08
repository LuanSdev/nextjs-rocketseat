import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";

export default function Member({ user }) {
  const {isFallback} = useRouter();

  if(isFallback){
    return <h1>Carregando...</h1>
  }

  return <div>
    <img src={user.avatar_url} alt={user.name} width={300} style={{ borderRadius: '50%' }} />
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat/members');
  const data = await response.json();

  const paths: any[] = data.map(member => ({
    params: {login:member.login}
  }))

  console.log(paths.length);

  return {
    paths,
    fallback: true
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
