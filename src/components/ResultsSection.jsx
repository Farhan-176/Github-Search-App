import React from 'react'
import Loader from './Loader'
import ProfileCard from './ProfileCard'
import ReposList from './ReposList'
import './ResultsSection.css'

export default function ResultsSection({ user, repos, loading }) {
  return (
    <section className="results-section">
      {loading && <Loader />}
      {user && !loading && (
        <>
          <div className="profile-container">
            <ProfileCard user={user} />
          </div>
          {repos.length > 0 && (
            <div className="repos-container">
              <ReposList repos={repos} />
            </div>
          )}
        </>
      )}
    </section>
  )
}
