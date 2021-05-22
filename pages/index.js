// import Head from 'next/head'
import { Typography, IconButton } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import Link from "next/link";
import style from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={style.home}>
      <Typography className={style.title}>TLMB</Typography>
      <img src="/maths.svg" alt="logo" className={style.logo} />
      <Link href="/game">
        <IconButton className={style.play_btn}>
          <PlayArrow />
        </IconButton>
      </Link>
      <Typography className={style.play_text}>PLAY</Typography>
    </div>
  );
}
