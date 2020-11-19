const database = [
    {
      question  : "What is the name of Draco Malfoy's son?",
       a  : "Scorpius",
       b  : "Lucius",
       c  : "Diego",
       d  : "Severus",
       e  : "Dane",                    
       correct  : "a"
    },
    
    {
      question  : "What creature does Dumbledore have as a pet?",
       a  : "Efreet",
       b  : "Fey",
       c  : "Troll",
       d  : "Phoenix",
       e  : "Basilisk",                    
       correct  : "d"
    },
    
    {
      question  : "What is Voldemort's final horcrux?",
       a  : "A mirror",
       b  : "A snake",
       c  : "A brooch",
       d  : "Harry Potter",
       e  : "A violin",                    
       correct  : "b"
    },
    
    {
      question  : "Who takes over as headmaster of Hogwarts after Dumbledore's death?",
       a  : "Voldemort",
       b  : "Narcissa Black",
       c  : "Professor Trelawny",
       d  : "Delores Umbridge",
       e  : "Professor Snape",                    
       correct  : "e"
    },
    
    {
      question  : "Who killed Deatheater Antonin Dolohov during the Battle of Hogwarts?",
       a  : "Professor Flitwick",
       b  : "Ron Weasley",
       c  : "Falling Debris",
       d  : "Hermione Granger",
       e  : "A Troll",                    
       correct  : "a"
    },
    {
        question  : "What is the name of Draco Malfoy's son?",
         a  : "Scorpius",
         b  : "Lucius",
         c  : "Diego",
         d  : "Severus",
         e  : "Dane",                    
         correct  : "a"
      },
      
      {
        question  : "What creature does Dumbledore have as a pet?",
         a  : "Efreet",
         b  : "Fey",
         c  : "Troll",
         d  : "Phoenix",
         e  : "Basilisk",                    
         correct  : "d"
      },
      
      {
        question  : "What is Voldemort's final horcrux?",
         a  : "A mirror",
         b  : "A snake",
         c  : "A brooch",
         d  : "Harry Potter",
         e  : "A violin",                    
         correct  : "b"
      },
      
      {
        question  : "Who takes over as headmaster of Hogwarts after Dumbledore's death?",
         a  : "Voldemort",
         b  : "Narcissa Black",
         c  : "Professor Trelawny",
         d  : "Delores Umbridge",
         e  : "Professor Snape",                    
         correct  : "e"
      },
      
      {
        question  : "Who killed Deatheater Antonin Dolohov during the Battle of Hogwarts?",
         a  : "Professor Flitwick",
         b  : "Ron Weasley",
         c  : "Falling Debris",
         d  : "Hermione Granger",
         e  : "A Troll",                    
         correct  : "a"
      },
      {
        question  : "What is the name of Draco Malfoy's son?",
         a  : "Scorpius",
         b  : "Lucius",
         c  : "Diego",
         d  : "Severus",
         e  : "Dane",                    
         correct  : "a"
      },
      
      {
        question  : "What creature does Dumbledore have as a pet?",
         a  : "Efreet",
         b  : "Fey",
         c  : "Troll",
         d  : "Phoenix",
         e  : "Basilisk",                    
         correct  : "d"
      },
      
      {
        question  : "What is Voldemort's final horcrux?",
         a  : "A mirror",
         b  : "A snake",
         c  : "A brooch",
         d  : "Harry Potter",
         e  : "A violin",                    
         correct  : "b"
      },
      
      {
        question  : "Who takes over as headmaster of Hogwarts after Dumbledore's death?",
         a  : "Voldemort",
         b  : "Narcissa Black",
         c  : "Professor Trelawny",
         d  : "Delores Umbridge",
         e  : "Professor Snape",                    
         correct  : "e"
      },
      
      {
        question  : "Who killed Deatheater Antonin Dolohov during the Battle of Hogwarts?",
         a  : "Professor Flitwick",
         b  : "Ron Weasley",
         c  : "Falling Debris",
         d  : "Hermione Granger",
         e  : "A Troll",                    
         correct  : "a"
      }
];

const inputEl = Array.from(document.querySelectorAll('input[id]'));
const labelEl = Array.from(document.querySelectorAll('label[for]'));
const questionEl = document.querySelector('#question');
const submit_ans = document.querySelector('.submit-ans');

let currentIndex = 0;
let current_answer, current_question;

const getRandomQuestion =  (data) => {
    do{
        var index = Math.floor((Math.random()*10) % 14);
    }while(index == currentIndex);
    currentIndex = index;
    return data[currentIndex];
}

const updateQuestion = (question) => {
    questionEl.innerText = question.question;
    let ansList = [];
    for (const key in question) {
        if(key=='a'||key=='b'||key=='c'||key=='d'||key=='e'){
            if (question.hasOwnProperty(key)) {
                const element = question[key];
                ansList.push(element);
            }
        }     
    }
    for (let i = 0; i < ansList.length; i++) {
        const element = ansList[i];
        inputEl[i].value = element;
        labelEl[i].innerText = element;
        inputEl[i].addEventListener('change' , e => {
            current_answer = e.target.value;
        });
    }
}

submit_ans.addEventListener('click', (e)=>{

    //TODO: check ans
    current_question = database[currentIndex];
    if(current_answer !== current_question[current_question.correct]){
        console.log('Fail');
    }
    else{
        console.log('True');
    }

    //TODO: update question
    updateQuestion(getRandomQuestion(database));

    //TODO: clear checked
    inputEl.forEach(el => {
        el.checked = false;
    })

})

document.addEventListener('DOMContentLoaded', () => {
    updateQuestion(getRandomQuestion(database));
});
