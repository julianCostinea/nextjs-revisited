import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import classes from "./grid.module.scss";

const Grid: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Grid without media queries </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
        <div className={classes.card}>
          <div className={classes.info}>
            <strong className={classes.title}>My Title</strong>
            <p className={classes.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              consectetur sapiente ipsam nihil velit quae ab unde quasi
              exercitationem esse
            </p>
          </div>
          <img src="http://freeaussiestock.com/free/Victoria/Melbourne/slides/fed_square.jpg" />
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="logo">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Grid;
