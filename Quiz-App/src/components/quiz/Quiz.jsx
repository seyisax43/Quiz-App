import  { useState, useRef} from 'react'
import './quiz.css'
import { data } from '../../../public/assets/Data';



function Quiz() {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    // whenever the wrong option is picked the correct option will be highlited
    
    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
     let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];
    

// lock make it impossible to pick multiple options
    const checkAns = (e, ans) => {
// 
      
        if (lock === false) {
       if (question.ans === ans) {
           e.target.classList.add('correct');
           setLock(true);
           setScore(prev => prev + 1);
        }
        else {
           e.target.classList.add('wrong');
           setLock(true);
           option_array[question.ans-1].current.classList.add('correct')
        }
    }
         }
    // the next function is to make sure the question foes to the next
    // remove the current answer 
    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
           
       } 
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
 
  return (
      <div className='container'>
          <h1>Quiz App</h1>
          <hr />
          {/* the itenaryoprator is tocheck and display result */}
          {result ? <></> :
              <>
          <h2>{index + 1}. { question.question}</h2>
          <ul>
              <li ref={option1} onClick={(e) => {checkAns(e,1)}}>{question.option2}</li>
              <li  ref={option2} onClick={(e) => {checkAns(e,2)}}>{question.option1}</li>
              <li  ref={option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
              <li  ref={option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>
              
          
          </ul>
          <button onClick={next}>Next</button>

          {/* the {index + 1 replace 1 and data.lenght replace 5... 1 of 5} {*/}
                  <div className="index">{index + 1} of {data.length} Questions</div>
                
              </>}
            {result?<>
                  
                    <h2>You Scored {score} out of {data.length} </h2>
                  <button onClick={reset}>Reset</button>
                  </>:<></>}
                  
      </div>
  )
}

export default Quiz