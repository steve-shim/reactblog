import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseApp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  // 받아온 데이터를 저장할 상태값 필요 -> 받아온 데이터를 렌더링할거다
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      //setPosts(dataObj); // 마지막 하나의 데이터만 추가된다
      setPosts((prev) => [...prev, dataObj] as PostProps);
    });
  };

  console.log("posts", posts);
  // 페이지가 새로 마운트 될때마다 DB에서 데이터를 가져와야한다
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체 글
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__detail">
        {posts?.length > 0 ? (
          posts.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>

              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다</div>
        )}
      </div>
    </>
  );
}
