import { Button, Card, CardBody, CardImg, CardText, CardTitle,  } from "reactstrap"
import type { IPost } from "../../../types/IPost.ts"
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts"
import type { AppDispatch } from "../../../store/store.ts"
import { useEffect, useState } from "react"
import { fetchComments, selectPostComments } from "../../../store/redditSlice.ts"
import OverlayComponent from "../utils/Overlay.tsx"
import Comment from "./Comment.tsx"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import moment from "moment"

interface PostsList {
  posts: IPost[];
  selectedSubreddit: string;
}

export default function PostsList(props: PostsList) {
  const { posts, selectedSubreddit } = props
  const dispatch = useAppDispatch<AppDispatch>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [commentOverlayIsOpen, setCommentOverlayIsOpen] = useState(false)
  const [pictureOverlayIsOpen, setPictureOverlayIsOpen] = useState(false)
  const comments = useAppSelector(selectPostComments(activeIndex))

  const toggleCommentOverlay = () => setCommentOverlayIsOpen(!commentOverlayIsOpen)

  const togglePictureOverlay = () => setPictureOverlayIsOpen(!pictureOverlayIsOpen)

  const isImageUrl = (url: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)

  useEffect(() => {
    if (posts.length > 0) {
      const permalink = posts[activeIndex]?.permalink
      if (permalink) {
        dispatch(fetchComments(activeIndex, permalink))
      }
    }
  }, [activeIndex, dispatch])

  return (
    <>
      <h6 className="text-center mt-2 mb-4">Subre<span className='text-danger'>dd</span>it: #{selectedSubreddit}</h6>
      <div className="d-flex flex-column gap-4">
        {posts?.map((post, i) => (
          <Card
            key={i}
            onClick={() => (activeIndex !== i ? setActiveIndex(i) : null)}
            className="shadow-sm"
          >
            {isImageUrl(post.url) && (
              <CardImg
                top
                src={post.url}
                alt={post.title}
                className="rounded-top"
                onClick={togglePictureOverlay}
              />
            )}
            <CardBody>
              <CardTitle tag="h5" className="text-break mobile">
                {post.title}
              </CardTitle>
              <CardText className="text-muted mobile">
                {`${moment.unix(post.created_utc).fromNow()} by ${post.author}`}
              </CardText>
              <Button
                color="info"
                outline
                className="btn-lg btn-sm d-md-none d-lg-block ms-auto"
                onClick={toggleCommentOverlay}
              >
                {comments.isLoading && activeIndex === i ? (
                  <AiOutlineLoading3Quarters />
                ) : (
                  activeIndex === i ? comments.data?.length : ""
                )}
                <span className={activeIndex === i ? 'ms-1' : ''}>Comments</span>
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <OverlayComponent
        isOpen={commentOverlayIsOpen}
        toggle={toggleCommentOverlay}
        title="Comments"
      >
        {comments.isLoading ? (
          <div>Loading comments...</div>
        ) : comments.error ? (
          <div>Failed to load comments.</div>
        ) : comments.data?.length > 0 ? (
          comments.data.map((comment, i) => <Comment key={i} comment={comment} />)
        ) : (
          <div>No comments available.</div>
        )}
      </OverlayComponent>
      <OverlayComponent
        isOpen={pictureOverlayIsOpen}
        toggle={togglePictureOverlay}
        title="Picture"
      >
        <div className="text-center mobile mb-2">
          {posts[activeIndex]?.title}
        </div>
        <img
          src={posts[activeIndex]?.url}
          alt={posts[activeIndex]?.title}
          className="d-block w-100 rounded-5 m-auto"
          style={{
            height: "100%",
            objectFit: "cover"
          }}
        />
      </OverlayComponent>
    </>
  )
}