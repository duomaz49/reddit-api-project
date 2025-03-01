import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button
} from "reactstrap"
import { CiImageOff } from "react-icons/ci"
import OverlayComponent from "../utils/Overlay"
import Comment from "./Comment"
import { fetchComments, selectPostComments } from "../../../store/redditSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import type { IPost } from "../../../types/IPost"
import moment from "moment/moment"
import type { AppDispatch } from "../../../store/store"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface CarouselProps {
  posts: IPost[];
}

export default function PostsCarousel(props: CarouselProps) {
  const { posts } = props
  const dispatch = useAppDispatch<AppDispatch>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [commentOverlayIsOpen, setCommentOverlayIsOpen] = useState(false)
  const [pictureOverlayIsOpen, setPictureOverlayIsOpen] = useState(false)
  const comments = useAppSelector(selectPostComments(activeIndex))

  const toggleCommentOverlay = () => setCommentOverlayIsOpen(!commentOverlayIsOpen)

  const togglePictureOverlay = () => setPictureOverlayIsOpen(!pictureOverlayIsOpen)

  const next = () => {
    const nextIndex = activeIndex === posts.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    const nextIndex = activeIndex === 0 ? posts.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const handleImageError = () => {
  }

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
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
      dark
    >
      <CarouselIndicators
        items={posts.map((_, i) => ({ id: i }))}
        activeIndex={activeIndex}
        onClickHandler={(index) => setActiveIndex(index)}
      />
      {posts.map((post, i) => (
        <CarouselItem
          key={i}
        >
          <div className="text-center my-3 mobile">
            <h4 className="text-break mobile">{post.title}</h4>
            <p
              className="text-muted text-break mobile">{`${moment.unix(post.created_utc).fromNow()} by ${post.author}`}</p>
          </div>
          {isImageUrl(post.url) ? (
            <div
              onClick={togglePictureOverlay}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="d-block w-75 rounded-5 m-auto"
                style={{
                  height: "20%",
                }}
                onError={handleImageError}
              />
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center rounded-5"
              style={{
                height: "60vh"
              }}
            >
              <CiImageOff style={{ fontSize: "10vw", color: "orange" }} />
              <div className="text-muted ms-2">Image not available</div>
            </div>
          )}
        </CarouselItem>
      ))}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    <div className="d-flex justify-content-center m-auto mt-3 w-75">
      <Button
        block
        color="info"
        outline
        className="rounded-3"
        onClick={toggleCommentOverlay}>
        {comments.isLoading ? <AiOutlineLoading3Quarters /> : comments.data?.length} Comments
      </Button>
    </div>
    <OverlayComponent isOpen={commentOverlayIsOpen} toggle={toggleCommentOverlay} title="Comments">
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
      <div className='text-center mobile mb-2'>
        {posts[activeIndex]?.title}
      </div>
      <img
        src={posts[activeIndex]?.url}
        alt={posts[activeIndex]?.title}
        className="d-block w-75 rounded-5 m-auto"
        style={{
          height: "100%",
          objectFit: "cover"
        }}
        onError={handleImageError}
      />
    </OverlayComponent>
</>
)
}