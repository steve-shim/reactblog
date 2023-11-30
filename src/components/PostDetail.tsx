export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">form of a webpage</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">패스트캠퍼스</div>
            <div className="post__date">2023.11.28</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">수정</div>
          </div>
          <div className="post__text">
            Lorem ipsum may be used as a placeholder before final copy is
            available. It is also used to temporarily replace text in a process
            called greeking, which allows designers to consider the form of a
            webpage or publication, without the meaning of the text influencing
            the design.
          </div>
        </div>
      </div>
    </>
  );
}
