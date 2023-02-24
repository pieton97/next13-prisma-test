'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormPost() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  // creating a submit post
  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(`/api/createPost`, {
      method: 'POST',
      body: JSON.stringify({ title })
    });
    const res = await data.json();
    router.refresh();
    if (!res.ok) console.log(res.message);
  }

  return (
    <form onSubmit={submitPost}>
      <input className="m-3" onChange={e => setTitle(e.target.value)} value={title} type="text" />
      <button type="submit">create new post</button>
    </form>
  );
}
