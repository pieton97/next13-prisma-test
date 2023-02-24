import Link from 'next/link';
import FormPost from './FormPost';

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: { id: number; title: string }[] = await getPosts();
  console.log(data);

  return (
    <main className="text-center py-2 bg-slate-500">
      <h1>homepage</h1>
      <FormPost />
      {data.map(post => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
    </main>
  );
}
