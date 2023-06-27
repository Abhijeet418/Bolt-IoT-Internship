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
const ans = document.getElementsByClassName('options')[0];
const que = document.getElementsByClassName('question')[0];
const nxt = document.querySelector('button[id="nxt"]');
const prev = document.querySelector('button[id="prv"]');

var qno = 0;
var points = [0, 0, 0, 0, 0];
function main() {
    qu = document.getElementsByClassName('question')[0];
    qu.innerHTML = 'Welcome to the Web Development Quiz!';
    while (ans.firstChild) {
        ans.removeChild(ans.firstChild);
    }
    nxt.style.display = 'none';
    prev.style.display = 'none';
    const start = document.createElement('button');
    start.innerHTML = 'START';
    document.getElementsByClassName('next')[0].appendChild(start);
    start.style.marginLeft = '40%';
    start.style.marginRight = '40%';
    start.style.display = 'inline';
    start.addEventListener('click', () => {
        start.style.display = 'none';
        addProgress();
        qno++;
        StartOrNext();
    });
}
function addProgress() {
    const p = document.createElement('div');
    const bar = document.getElementsByClassName('progress')[0];
    bar.appendChild(p);
    p.id = 'prog';
    p.style.borderRadius = '7px';
    bar.style.borderRadius = '10px';
    p.style.textAlign = 'right';
    p.style.fontSize = '25px';
    p.classList.add('progress');
    bar.style.height = '10%';
    bar.style.width = '100%';
    bar.style.backgroundColor = 'grey';
    bar.style.marginBottom = '2px';
    p.style.transition = '0.6s';
}
function reveal() {
    const btn = document.getElementsByClassName('btn');
    for (i = 0; i < 4; i++) {
        btn[i].disabled = 'true';
        op = btn[i].innerHTML;
        if (op === bank[0][qno]) {
            btn[i].style.transition = '0.5s';
            btn[i].style.backgroundColor = '#4EF0D1';
            btn[i].style.textShadow = '2px 2px green';
        } else {
            btn[i].style.transition = '0.5s';
            btn[i].style.opacity = 0.5;
            btn[i].style.backgroundColor = 'red';
            btn[i].style.textShadow = '1px 1px black';
        }
    }
    const exists = document.getElementsByClassName('next')[0];
    while (exists.firstChild) {
        exists.removeChild(exists.firstChild);
    }
    const nxt = document.createElement('button');
    nxt.innerHTML = 'NEXT';
    document.getElementsByClassName('next')[0].appendChild(nxt);
    nxt.style.marginLeft = '40%';
    nxt.style.marginRight = '40%';
    nxt.style.display = 'inline';
    nxt.addEventListener('click', () => {
        if (qno == 5) {
            endQuiz();
        } else {
            qno++;
            StartOrNext();
        }
    });
    const prev = document.createElement('button');
    prev.innerHTML = 'PREV';
    document.getElementsByClassName('next')[0].appendChild(prev);
    prev.style.marginLeft = '40%';
    prev.style.marginRight = '40%';
    prev.style.display = 'inline';
    prev.addEventListener('click',()=>{
        qno--;
        StartOrNext();
    });
    if (qno > 1 && qno < 6) {
        prev.style.display = 'inline';
    }else{
        prev.style.display = 'none';
    }
    if (qno == 5) {
        nxt.innerHTML = 'FINISH';
    }
}
function StartOrNext() {
    const bar = document.getElementById('prog');
    bar.innerHTML = '&#8205';
    bar.style.width = 'd0%'.replace('d', 2 * (qno - 1));
    bar.style.backgroundColor = '#36E7C8';
    bar.style.color = 'black';
    while (ans.firstChild) {
        ans.removeChild(ans.firstChild);
    }
    while (que.firstChild) {
        que.removeChild(que.firstChild);
    }
    qu = document.createElement('h3');
    qu.innerHTML = qno + '. ' + bank[qno].q;
    que.appendChild(qu);
    var rand = Math.floor((Math.random() * 8));
    let i = 0;
    while (i != 4) {
        j = (rand + i) % 4;
        op = bank[qno].a[j];
        const opt = document.createElement('button');
        opt.innerHTML = op;
        opt.classList.add('btn');
        ans.appendChild(opt);
        opt.addEventListener('click', () => {
            if (opt.innerHTML === bank[0][qno]) {
                points[qno] = 1;
            }else{
                points[qno] = 0;
            }
            reveal();
        });
        i++;
    }
};
function endQuiz() {
    const bar = document.getElementById('prog');
    bar.innerHTML = '&#8205';
    bar.style.width = 'd0%'.replace('d', 2 * (qno));
    bar.style.backgroundColor = '#36E7C8';
    bar.style.color = 'black';
    qu = document.getElementsByClassName('question')[0];
    const point = points.reduce((partialSum, a) => partialSum + a, 0);
    if (points == 1) {
        qu.outerHTML = "<h1 class='question'> You have scored pts point! <br> Better Luck next time! </h1>".replace('pts', point);
    } else if (points < 3) {
        qu.outerHTML = "<h1 class='question'> You have scored pts points! <br> Better Luck next time! </h1>".replace('pts', point);
    } else {
        qu.outerHTML = "<h1 class='question'> You have scored pts points! <br> Good Job! </h1>".replace('pts', point);
    }
    while (ans.firstChild) {
        ans.removeChild(ans.firstChild);
    }
    nxt.style.display = 'none';
    const r = document.getElementsByClassName('next')[0];
    while (r.firstChild) {
        r.removeChild(r.firstChild);
    }
    const restart = document.createElement('button');
    restart.innerHTML = 'RETRY';
    document.getElementsByClassName('next')[0].appendChild(restart);
    restart.style.marginLeft = '35%';
    restart.style.marginRight = '40%';
    restart.style.display = 'inline';
    restart.addEventListener('click', () => {
        location.reload();
    });
};
main();