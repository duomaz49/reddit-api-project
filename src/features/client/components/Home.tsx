import { Container, Spinner } from "reactstrap"
import NavBar from "../utils/NavBar"
import type { AppDispatch } from "../../../store/store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { fetchComments } from "../../../store/redditSlice"
import { useEffect } from "react"
import { fetchPosts } from "../../../store/redditSlice"
import PostsCarousel from "./PostsCarousel"
import ResponsiveSpinner from "../utils/ResponsiveSpinner"

export default function Home() {
  const dispatch = useAppDispatch<AppDispatch>()
  const reddit = useAppSelector((state) => state.reddit)
  const { isLoading, error, selectedSubreddit } = reddit

  const posts = useAppSelector((state) => state.reddit.posts)

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit))
  }, [dispatch, selectedSubreddit])

  const onToggleComments = (i) => () => {
    return (permalink) => {
      dispatch(fetchComments(i, permalink))
    }
  }

  return (
    <>
      <NavBar />
      <Container fluid className="mt-5 p-5 h-100 d-flex flex-column justify-content-center align-items-center">
          {isLoading ? (
            <ResponsiveSpinner />
          ) : (
            <div className="w-75">
            <PostsCarousel posts={posts} />
            </div>
          )}

      </Container>
    </>
  )
}