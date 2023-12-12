import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebaseApp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updateAt?: string;
  uid: string;
  categories?: CategoryType;
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  // 받아온 데이터를 저장할 상태값 필요 -> 받아온 데이터를 렌더링할거다
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      //나의 글만 필터링
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createAt", "asc")
      );
    } else if (activeTab === "all") {
      //모든 글 보여주기
      postsQuery = query(postsRef, orderBy("createAt", "asc"));
    } else {
      // 카테고리 글 보여주기
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createAt", "asc")
      );
    }

    //const datas = await getDocs(collection(db, "posts"));
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      //setPosts(dataObj); // 마지막 하나의 데이터만 추가된다
      setPosts((prev) => [...prev, dataObj] as PostProps);
    });
  };

  const handleDelete = async (id: string) => {
    console.log("List ID", id);
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글을 삭제했습니다.");
      getPosts();
    }
  };

  console.log("PostList posts", posts);
  // 페이지가 새로 마운트 될때마다 DB에서 데이터를 가져와야한다
  useEffect(() => {
    getPosts();
    console.log("PostList useEffect 수행!");
  }, [activeTab]);

  // useEffect(() => {
  //   getPosts();
  //   console.log("PostList useEffect posts", posts);
  // }, [posts]); <- 이러면 무한루프에 빠진다

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
          {CATEGORIES?.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
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
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
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
