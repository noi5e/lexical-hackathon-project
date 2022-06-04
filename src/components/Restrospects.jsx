import { useState } from "react";
import { timestamp } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";
import Avatar from "../Avatar/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Restrospects() {
  const { documents, error } = useCollection("posts");
  return (
    <div className="posts">
      <h4>Retrospects</h4>
      <div>
        {documents &&
          documents.length > 0 &&
          documents.map((post) => (
            <div key={post.id} className="post">
              <div className="post-author">
                <Avatar />
                <p className="name">{post.displayName}</p>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="post-date">
                <p className="date">
                  {formatDistanceToNow(post.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
