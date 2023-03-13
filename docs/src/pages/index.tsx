import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import styles from './index.module.css'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title='ZK ECDSA GROUPS' description='Anonymous Proof of Membership'>
      <div className={styles.titleContainer}>
        <h1 className='hero__title'>{siteConfig.title}</h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div>
          <Link
            className='button button--secondary button--lg'
            to='/docs/intro'
          >
            Tutorial - xx min ⏱️
          </Link>
        </div>
      </div>
    </Layout>
  )
}
