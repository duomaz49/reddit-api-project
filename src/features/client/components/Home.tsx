import { Container } from "reactstrap"
import NavBar from "../utils/NavBar"
import type { AppDispatch } from "../../../store/store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { fetchComments, selectPosts } from "../../../store/redditSlice"
import { useEffect } from "react"
import { fetchPosts } from "../../../store/redditSlice"
import PostsCarousel from "./PostsCarousel"
import ResponsiveSpinner from "../utils/ResponsiveSpinner"

export default function Home() {
  const dispatch = useAppDispatch<AppDispatch>()
  const reddit = useAppSelector((state) => state.reddit)
  const { isLoading, error, selectedSubreddit } = reddit

  const posts = useAppSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit))
  }, [dispatch, selectedSubreddit])

  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex flex-column justify-content-center align-items-center"
      >
        <NavBar />
        {isLoading ? (
          <ResponsiveSpinner />
        ) : error ? (
          <h1 className='fw-bold'>Error loading posts too many requests. Please try again later.</h1>
        ) : (
          <div className="w-75 w-sm-100">
            <PostsCarousel posts={posts} />
          </div>
        )}
      </Container>
    </>
  );
}