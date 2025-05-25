import { Container } from "reactstrap"
import NavBar from "../utils/NavBar"
import type { AppDispatch } from "../../../store/store"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { selectPosts } from "../../../store/redditSlice"
import { useEffect } from "react"
import { fetchPosts } from "../../../store/redditSlice"
import PostsList from "./PostsList"
import ResponsiveSpinner from "../utils/ResponsiveSpinner"

export default function Home() {
  const dispatch = useAppDispatch<AppDispatch>()
  const reddit = useAppSelector((state) => state.reddit)
  const { isLoading, error, selectedSubreddit } = reddit
  const posts = useAppSelector(selectPosts)
  const windowWidth = window.innerWidth

  useEffect(() => {
    if (selectedSubreddit === "") return
    dispatch(fetchPosts(selectedSubreddit))
  }, [dispatch, selectedSubreddit])


  return (
    <>
      <Container
        fluid
        className="vh-100 mt-5 p-5 d-flex flex-column justify-content-center align-items-center"
      >
        <NavBar />
        {selectedSubreddit === "" && (
          <div className="card text-center shadow-lg p-4 mb-5 bg-white rounded" style={{ maxWidth: "600px" }}>
            <div className="card-body">
              <h1 className="card-title fw-bold">
                Welcome to Re<span className="text-danger">dd</span>it Minimal!
              </h1>
              <p className="card-text text-muted">
                Please select a subreddit category from the header to view posts
              </p>
            </div>
          </div>
        )}
        {isLoading && selectedSubreddit ? (
          <ResponsiveSpinner />
        ) : error ? (
          <h1 className="fw-bold">
            Error loading posts too many requests. Please try again later.
          </h1>
        ) : (
          selectedSubreddit && (
            <div className={`${windowWidth < 768 ? 'w-100' : 'w-50'}`}>
              <PostsList
                posts={posts}
                selectedSubreddit={selectedSubreddit}
              />
            </div>
          )
        )}
      </Container>
    </>
  );
}