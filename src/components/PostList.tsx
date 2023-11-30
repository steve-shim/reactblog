import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation--active">전체 글</div>
          <div>나의 글</div>
        </div>
      )}
      <div className="post__detail">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">패스트캠퍼스</div>
                <div className="post__date">2023.11.28</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum may be used as a placeholder before final copy is
                available. It is also used to temporarily replace text in a
                process called greeking, which allows designers to consider the
                form of a webpage or publication, without the meaning of the
                text influencing the design.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
