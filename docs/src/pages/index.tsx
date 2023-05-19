import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <img
          src='/e2e-zk-ecdsa/img/anonklub.svg'
          width={200}
          height={200}
          alt='logo'
        />
        <h1 className='hero__title'>{siteConfig.title}</h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div>
          <Link
            className='button button--secondary button--lg'
            to='/docs/intro'
          >
            Example Tutorial
          </Link>
        </div>
      </div>
    </Layout>
  )
}
