'use client';

import React, { useState } from 'react';
import useAsyncRunner from '@/registry/hooks/useAsyncRunner'; // adjust the import path as needed

// Define the shape of the data returned from JSONPlaceholder
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Define the async function to fetch a post by ID
const fetchPostById = async (id: number): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
};

export default function FetchPost() {
  const [postId, setPostId] = useState<number>(1);

  const {
    run: fetchPost,
    data,
    error,
    isPending,
    isSuccess,
    isFailure,
  } = useAsyncRunner<[number], Post>({ action: fetchPostById });

  const handleFetch = async () => {
    await fetchPost(postId);
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Fetch Post</h1>
      <div>
        <label className="mr-2">Post ID:</label>
        <input
          type="number"
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="rounded border px-2 py-1"
        />
        <button
          onClick={handleFetch}
          className="ml-2 rounded bg-blue-600 px-4 py-1 text-white"
        >
          Fetch
        </button>
      </div>

      {isPending && <p>Loading...</p>}
      {isFailure && <p className="text-red-500">Error: {String(error)}</p>}
      {isSuccess && data && (
        <div className="rounded border p-2">
          <h2 className="font-semibold">Title: {data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
