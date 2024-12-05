import { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from "reactstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import OverlayComponent from "../utils/Overlay";
import Comment from "./Comment";
import { selectPostComments } from "../../../store/redditSlice";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../types/IPost"

interface CarouselProps {
  posts: IPost[];
  onToggleComments: (i: number, permalink: string) => void;
}

export default function PostsCarousel({ posts, onToggleComments }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const comments = useAppSelector(
    selectPostComments(activeIndex)
  );

  const toggleOverlay = () => setOverlayIsOpen(!overlayIsOpen);

  const showComments = () => {
    const permalink = posts[activeIndex].permalink;
    onToggleComments(activeIndex, permalink);
    toggleOverlay();
  };

  const next = () => {
    const nextIndex = activeIndex === posts.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? posts.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handleImageError = () => {};

  const isImageUrl = (url: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
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
            {isImageUrl(post.url) ? (
              <img
                src={post.url}
                alt={post.title}
                className="d-block w-100 rounded-5"
                style={{ height: "70vh", objectFit: "cover" }}
                onError={handleImageError}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center bg-secondary rounded-5"
                style={{ height: "70vh" }}
              >
                <FaExclamationTriangle style={{ fontSize: "10vw", color: "red" }} />
                <div className="text-muted ms-2">Image not available</div>
              </div>
            )}
            <CarouselCaption captionHeader={post.title} captionText={post.title} />
          </CarouselItem>
        ))}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      <div className="d-flex justify-content-center mt-3">
        <Button
          block
          color="info"
          outline
          className='rounded-3'
          onClick={showComments}>
          Show Comments
        </Button>
      </div>
      {/* Overlay for Comments */}
      <OverlayComponent isOpen={overlayIsOpen} toggle={toggleOverlay} title="Comments">
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
    </>
  );
}