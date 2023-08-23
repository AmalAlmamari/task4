import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import{interval, timeout} from 'rxjs'
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  public name: string = "";
 public questionList:any=[];
 public currentQuestion: number = 0;
 public points: number = 0;
 counter = 60;
 correctAnswer:number=0;
 incorrectAnswer:number=0;
 interval$: any;
 isQuizCompleted : boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
   this.getAllQuestions();
   this.startCounter();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList=res.question;
    })
  }
  nextQuestion(){
this,this.currentQuestion++;
  }
  previouseQuetion(){
    this.currentQuestion--;
  }
  answer(currentQuestion:number,option:any){
if(currentQuestion===this.questionList.length){
  this.isQuizCompleted = true;
  this.stopCounter;
}
if(option.correct)
{
this.points+=1;
//this.points=this.points +1;
this.correctAnswer++;
setTimeout(()=>{
  this.currentQuestion++;
},1000);

}else{
setTimeout(()=>{
  this.points-=1;
  this.currentQuestion++;
  this.incorrectAnswer++;
}, 1000);
}
  }
  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=1;
      }
    });
    setTimeout(()=>{
this.interval$.unsubscribe();
    },600000);
  }
  stopCounter(){
this.interval$.unsubscribe();
this.counter=0;
  }
  resoCounter(){
this.stopCounter();
this.counter=60;
this.startCounter();
  }
  resetQuiz(){
    this.resoCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
  }
}
