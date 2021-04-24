import { useEffect, useContext, useState, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import Router from "next/router";
import axios from "axios";
import style from "../styles/Game.module.css";

const Game = () => {
  const timer = () =>{
    if(level?.toLowerCase() ==="easy")
    return 45
    else if(level?.toLowerCase() ==="average")
    return 60
    else if(level?.toLowerCase() ==="extreme")
    return 75
  };
  const { category } = useContext(AppContext);
  const [level, _setLevel] = category;
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(timer());
  let intervalRef = useRef();

  const decreaseNum = () => setTime((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
  }, []);
  useEffect(() => {
    if (time === 0) {
      setMessage("Times up");
      setButtonState(true);
      clearInterval(intervalRef.current);
    }
  }, [time]);
  useEffect(() => {
    if (!level) Router.push("/category");
    axios
      .get("/api/questions", {
        params: { level },
      })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch(() => {
        Router.push("/category");
      });
  }, [level]);
  if (!level)
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );

  const chooseAnswer = (correct, text) => {
    if (correct) {
      setScore((state) => state + 1);
      setMessage(text + " is Correct");
    } else setMessage(text + " is wrong");
    setButtonState(true);
    clearInterval(intervalRef.current);
  };

  const nextQuestion = () => {
    setCounter((state) => state + 1);
    setMessage("");
    setButtonState(false);
    setTime(timer());
    intervalRef.current = setInterval(decreaseNum, 1000);
    if (counter + 1 === questions.length) {
      setDone(true);
      clearInterval(intervalRef.current);
    }
  };
  if (questions.length > 1 && level) {
    return (
      <div className={style.game_container}>
        <div className={style.game_card}>
          <div className={style.card_header}>
            <Typography className={style.level_text}>
              Level <span className={style[level?.toLowerCase()]}>{level}</span>
            </Typography>

            <Typography>
              Score: <span className={style.points}>{score}</span>
            </Typography>
          </div>
          <div className={style.question_container}>
            <Typography className={style.question_text}>{questions[counter]?.questionText}</Typography>
            <Typography className={style.message}>{message}</Typography>
          </div>
          <Typography className={style.time}>{time}</Typography>
          <div className={style.button_container}>
            {questions[counter]?.answerOptions.map((answer, index) => (
              <Button
                disabled={buttonState}
                key={index}
                variant="contained"
                color="primary"
                onClick={() =>
                  chooseAnswer(answer.isCorrect, answer.answerText)
                }
              >
                {answer.answerText}
              </Button>
            ))}
          </div>
          {done && (
            <div className={style.done_container}>
              <Typography className={style.summary}>
                Your total score is &nbsp;
                <span className={style.points}>{score}</span>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => Router.push("/category")}
                className={style.back_btn}
              >
                Go back to Main Menu
              </Button>
            </div>
          )}
          <Button
            disabled={!buttonState}
            variant="contained"
            color="secondary"
            onClick={nextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );
  }
};

export default Game;
