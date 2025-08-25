import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

const Community: React.FC = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "communityPosts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    await addDoc(collection(db, "communityPosts"), {
      text: newPost,
      createdAt: serverTimestamp(),
    });

    setNewPost("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Community</h1>

      {/* Post Form */}
      <form onSubmit={handlePost} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something with the community..."
          className="flex-1 border rounded-lg p-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Post
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-gray-800">{post.text}</p>
              <span className="text-sm text-gray-500">
                {post.createdAt?.toDate().toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
