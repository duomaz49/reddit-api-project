import { useState } from "react"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators, CarouselCaption
} from "reactstrap"
import type { Post } from "../../../types/Post"
import { FaExclamationTriangle } from "react-icons/fa"


interface CarouselProps {
  posts: Post[];
}

export default function PostsCarousel({ posts, ...args }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [isValidImage, setIsValidImage] = useState(true)

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

  return (
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
              className="d-block w-100 rounded-5 mobile"
              onError={handleImageError}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center bg-secondary-subtle rounded-5 mobile"
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
            captionText={post.caption}
            captionHeader={post.title}
          />
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
  )
}