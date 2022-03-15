import { SingInButton } from '../SingInButton'

import styles from './styles.module.scss'

export function Header(){
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo" />
        <nav>
          <a href="/" className={styles.active}>Home</a>
          <a href="/posts">Posts</a>
        </nav>
        <SingInButton/>
      </div>
    </header>
  )
}