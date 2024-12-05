import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { fetchSubreddits, selectSubreddits } from "../../../store/subRedditSlice"
import { setSelectedSubreddit } from "../../../store/redditSlice"
import { useEffect } from "react"
import type { AppDispatch } from "../../../store/store"
import SubRedditList from "./SubRedditList"
import SkeletonLoader from "../utils/Skeletonloader"

interface SubRedditsProps {
  toggleOffcanvas: () => void
}

export default function SubReddits(props: SubRedditsProps) {
  const { toggleOffcanvas } = props
  const dispatch = useAppDispatch<AppDispatch>()
  const subReddits = useAppSelector(selectSubreddits)
  const isLoading = useAppSelector((state) => state.subReddit.isLoading)
  const selectedSubReddit = useAppSelector((state) => state.reddit.selectedSubreddit)
  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])

  const handleSubRedditSelect = (url: string) => {
    dispatch(setSelectedSubreddit(url))
    toggleOffcanvas()
  }
  return (
    <>
      {isLoading ?
        <SkeletonLoader length={subReddits?.length} />
        :
        <div className="w-auto">
          <SubRedditList
            subReddits={subReddits}
            handleSubRedditSelect={handleSubRedditSelect}
            selected={selectedSubReddit}
          />
        </div>
      }
    </>
  )
}