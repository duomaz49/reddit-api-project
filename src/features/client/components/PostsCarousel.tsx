import { useState } from "react"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators, CarouselCaption, Button
} from "reactstrap"
import type { IPost } from "../../../types/IPost"
import { FaExclamationTriangle } from "react-icons/fa"
import OverlayComponent from "../utils/Overlay"
import Comment from "./Comment"
import { selectPostComments } from "../../../store/redditSlice"
import { useAppSelector } from "../../../store/hooks"


interface CarouselProps {
  posts: IPost[];
  onToggleComments: (i: number, permalink: string) => void;
}

export default function PostsCarousel({ posts, onToggleComments, ...args }: CarouselProps) {

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [isValidImage, setIsValidImage] = useState(true)
  const [overlayIsOpen, setOverlayIsOpen] = useState(false)
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null)
  const comments = useAppSelector(
    selectedPostIndex !== null ? selectPostComments(selectedPostIndex) : () => ({
      data: [],
      isLoading: false,
      error: false
    })
  )
  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === posts.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? posts.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex: number) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const isImageUrl = (url) => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i
    return imageExtensions.test(url)
  }

  const handleImageError = () => {
    setIsValidImage(false)
  }

  const toggleOverlay = () => setOverlayIsOpen(!overlayIsOpen)

  const showComments = (i: number, permalink: string) => {
    onToggleComments(i, permalink)
    setSelectedPostIndex(i)
    toggleOverlay()
  }

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        light
        {...args}

      >
        <CarouselIndicators
          items={posts.map((_, i) => ({ id: i }))}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {posts?.map((post, i) => (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={i}
          >
            {isValidImage && isImageUrl(post.url) ? (
              <img
                src={post.url}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "70vh",
                  margin: "auto"
                }}
                className="d-block w-100 rounded-5"
                onError={handleImageError}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center bg-secondary-subtle rounded-5"
                style={{
                  width: "100%",
                  height: "70vh",
                  margin: "auto"
                }}
              >
                <FaExclamationTriangle
                  style={{
                    fontSize: "10vw",
                    color: "red"
                  }}
                />
                <div className="text-muted ms-2">Image not available</div>
              </div>
            )}
            <CarouselCaption
              captionText={post.title}
              captionHeader={post.title}
            />
            <Button
              color="primary"
              onClick={() => showComments(i, post.permalink)}
              className="mt-2"
            >
              Comments
            </Button>
          </CarouselItem>
        ))}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      <OverlayComponent
        isOpen={overlayIsOpen}
        toggle={toggleOverlay}
        title={'Comments'}
      >
        {comments?.isLoading ? (
          <div>Loading comments...</div>
        ) : comments?.error ? (
          <div>Failed to load comments.</div>
        ) : comments?.data?.length > 0 ? (
          comments.data.map((comment, i) => <Comment key={i} comment={comment} />)
        ) : (
          <div>No comments available.</div>
        )}
      </OverlayComponent>
    </>
  )
}