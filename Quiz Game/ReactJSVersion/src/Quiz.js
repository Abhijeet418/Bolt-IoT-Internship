import './App.css';
import { useRef, useState } from "react";
const bank = [
  ['Answers', 'Angular Braces', 'JavaScript Object Notation',
    'font-weight', 'a', 'Padding'],
  {
    q: "What symbol indicates a tag?",
    a: ['Angular Braces', 'Parenthesis', 'Slash', 'Curly Braces']
  },
  {
    q: "What is the full form of JSON?",
    a: ['JavaScript Object Notation', 'Java Style Object Notation',
      'JavaScript Offline Notebook', 'JavaScribe Object Notation']
  },
  {
    q: "What should you use to make a text bold in CSS?",
    a: ['font-style', 'font-weight', 'font-shadow', 'font-bold']
  },
  {
    q: "Which of the following is used for creating Hyperlinks?",
    a: ['a', 'link', 'hyperlink', 'div']
  },
  {
    q: "What does space between the division and its elements called?",
    a: ['Padding', 'Margin', 'Header', 'Paragraph']
  },
  {
    q: 'Congratulations!'
  }
];
function Quiz() {
  const [qno, setQno] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState([0, 0, 0, 0, 0]);
  return (<><nav>
    <p>Quiz Game</p>
  </nav>
    <div className="quiz">
      <div className="progress">
        <Progress q={qno} />
      </div>
      <div className="question">
        <Question q={qno} p={points}></Question>
      </div>
      <div className="options">
        <Option q={qno} c={clicked} sc={setClicked} p={points} sp={setPoints} />
      </div>
      <div className="next">
        <More q={qno} s={setQno} sc={setClicked} c={clicked}></More>
      </div>
    </div></>);
}
function Question(props) {
  if (props.q == 0) {
    return (
      <>Welcome to the Web Development Quiz!</>
    );
  } else if (props.q == 6) {
    let score = 0;
    props.p.forEach(x => {
      score += x;
    });
    return (
      <>Congratulations! You Scored {score} point{(score != 1) ? 's' : ''}.</>
    );
  } else {
    return (<>
      <h4>{props.q}. {bank[props.q].q}</h4>
    </>);
  }
}
function Option(props) {
  if (props.q === 0 || props.q === 6) {
    return null;
  }
  const ops = bank[props.q].a;
  const correct = bank[0][props.q];
  return (
    <>
      {ops.map(option => (
        <button
          type='button'
          className={(!props.c) ? 'btn' : (correct == option) ?
            'right btn' : 'wrong btn'}
          disabled={props.c ? true : false}
          onClick={() => {
            props.sc(!props.c);
            let tp = [...props.p]
            tp[props.q - 1] = (correct == option) ? Number(1) : Number(0);
            props.sp(tp);
          }}>
          {option}
        </button>
      ))}
    </>
  );
}

function More(props) {
  function nextQ() {
    props.sc(false);
    props.s(Number(props.q) + 1);
  }
  function prevQ() {
    props.sc(false);
    props.s(Number(props.q) - 1);
  }
  function restartQ() {
    window.location.reload();
  }
  var b = [
    <><button type='button' className='next' key='next' onClick={nextQ}>NEXT</button></>,
    <><button type='button' className='next' key='prev' onClick={prevQ}>PREV</button></>,
    <><button type='button' className='next' key='finish' onClick={nextQ}>FINISH</button></>,
    <><button type='button' className='next' key='start' onClick={nextQ}>START</button></>,
    <><button type='button' className='next' key='restart' onClick={restartQ}>RESTART</button></>,
  ];
  if (props.q == 0) {
    return (
      <>{b[3]}</>
    );
  }
  if (props.q == 6) {
    return (
      <>{b[4]}</>
    );
  }
  if (!props.c) {
    return <></>;
  } else {
    if (props.q > 1 && props.q < 5) {
      return (
        <>{b[0]}{b[1]}</>
      );
    } else if (props.q == 5) {
      return (
        <>{b[1]}{b[2]}</>
      );
    } else {
      return (
        <>{b[0]}</>
      );
    }
  }
}
function Progress(props) {
  if (props.q == 0) {
    return <></>
  }
  const newstyle = {
    width: 'd0%'.replace('d', 2 * (props.q - 1)),
    backgroundColor: '#36E7C8',
    color: 'black',
    borderRadius : '7px',
    textAlign : 'right',
    fontSize : '25px',
    height: '10%',
    transition: '0.6s'
};
return (
  <div className='bar' style={newstyle}>{'\u3000'}</div>
);
}
export default Quiz;