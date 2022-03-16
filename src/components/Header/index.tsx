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
            <a>Home</a>
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