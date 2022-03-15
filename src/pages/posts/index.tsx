import Head from "next/head";
import styles from './styles.module.scss'


export default function Posts(){
  return (
    <>
      <Head>
        <title>Posts | Ignews </title>  
      </Head>    
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#" >
            <time>15 de março de 2022</time>
            <strong>JAMStack uma geléia de Javascript</strong>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur beatae qui necessitatibus minima fugit rem alias dolores iure molestias sed fuga placeat soluta impedit ab, et recusandae voluptatum perferendis corporis! </p>
          </a>
          <a href="#">
            <time>15 de março de 2022</time>
            <strong>JAMStack uma geléia de Javascript</strong>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur beatae qui necessitatibus minima fugit rem alias dolores iure molestias sed fuga placeat soluta impedit ab, et recusandae voluptatum perferendis corporis! </p>
          </a>
          <a href="#">
            <time>15 de março de 2022</time>
            <strong>JAMStack uma geléia de Javascript</strong>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur beatae qui necessitatibus minima fugit rem alias dolores iure molestias sed fuga placeat soluta impedit ab, et recusandae voluptatum perferendis corporis! </p>
          </a>
        </div>
      </main>
    </>



  )
}