import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'
import { SingInButton } from '../SingInButton'

import styles from './styles.module.scss'

export function Header(){
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>  
        <img src="/images/logo.svg" alt="logo" />
        <nav>
          <ActiveLink href="/" activeCLass={styles.active}>
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeCLass={styles.active}>
            <a>Posts</a>  
          </ActiveLink>
        </nav>
        <SingInButton/>
      </div>
    </header>
  )
}