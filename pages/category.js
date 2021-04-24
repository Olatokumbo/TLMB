import { useContext } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Router from "next/router";
import Link from "next/link";
import { AppContext } from "../contexts/AppContext";
import style from "../styles/Category.module.css";

const Category = () => {
  const { category } = useContext(AppContext);
  const [_level, setLevel] = category;

  const chooseLevel = (choice) => {
    setLevel(choice);
    Router.push("/game");
  };
  return (
    <div className={style.category_container}>
      <Typography className={style.header_title}>LEVELS</Typography>
      <div className={style.levels_container}>
        <Typography className={style.easy_text} onClick={() => chooseLevel("Easy")}>
          EASY
        </Typography>
        <Typography className={style.medium_text} onClick={() => chooseLevel("Average")}>AVERAGE</Typography>
        <Typography className={style.hard_text} onClick={() => chooseLevel("Extreme")}>EXTREME</Typography>
      </div>
      <Link href="/">
        <IconButton className={style.back_btn}>
          <ArrowBack />
        </IconButton>
      </Link>
    </div>
  );
};


export default Category;
