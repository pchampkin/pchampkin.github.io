import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Question } from './question';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // private billieQuizSvcUrl = 'billiequizwebapp.azurewebsites.net/BillieQuiz';
  // private billieQuizSvcUrl = 'api/questions';
  // private billieQuizSvcUrl = 'http://localhost:5000/billiequiz';
  // private billieQuizSvcUrl = 'https://billiequizsvcdockerappservice.azurewebsites.net/billiequiz';
  private billieQuizSvcUrl = environment.billieQuizSvcUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'allication/json' })
  }
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  private log(message: string) {
    this.messageService.add('HerooService', message);
  }
  
  getQuestion(): Observable<Question> {
    const url = `${this.billieQuizSvcUrl}/getquestion`;
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched question id=${_.questionId}`)),
      catchError(this.handleError<Question>('getQuestion'))
    );
  }
  
  checkAnswer(questionId: string, ansIdx: number): Observable<boolean> {
    const url = `${this.billieQuizSvcUrl}/checkAnswer/${questionId}/${ansIdx + 1}`;
    return this.http.get<boolean>(url).pipe(
      tap(_ => this.log(`checkAnswer id=${questionId} idx=${ansIdx} ${_}`)),
      catchError(this.handleError<boolean>(`checkAnswer id=${questionId} idx=${ansIdx}`))
    );
  }

  addQuestion(question: any, answerIdx: number) {
    const url = `${this.billieQuizSvcUrl}/addquestion/${answerIdx + 1}`;
    console.log(`1 - ${url}`);
    this.http.post(url, question).subscribe();
    console.log(`2 - ${url}`);
//    .pipe(
//      return 
//      tap(_ => this.log(`addQuestion ${question}`)),
//      catchError(this.handleError<boolean>(`add question ${question}`))
//    );
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.billieQuizSvcUrl}`)
      .pipe(
        tap(_ => this.log('NewGetQuestions')),
        catchError(this.handleError<Question[]>('getQuestions'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Failed: ${operation} failed: ${error.messsage}`);
      return of(result as T);
    };
  }  
}
