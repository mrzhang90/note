```js
//angular-CLI
npm i -g @angular/cli
ng new project
cd project
ng serve --open

//安装antd
ng add ng-zorro-antd

//创建组件
ng generate component heroes

//ngModel双向绑定
[(ngModel)]="hero.name"

//在模板中的元素上添加 [class.selected] 绑定
[class.selected]="hero === selectedHero"

//*ngFor指令 *星号是语法中的关键字
<li *ngFor="let hero of heroes"/>

*ngIf 隐藏空白的详情
<li *ngIf="hero"/>

//点击事件,click 外面的圆括号会让 Angular 监听这个 <li> 元素的 click 事件
<li (click)="onSelect(hero)">

//内联在@component.styles数组中
//在@component.styleUrls所指出的样式表文件
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
```
###服务
```js
// 创建一个服务
ng generate service hero

// 组件不应该直接获取或保存数据，应该聚焦展示数据，而服务最适合处理数据
// 不要使用new创建服务，依靠angular的依赖注入机制把服务注入到组件的构造函数中

// @Injectable() services 可注入的服务

// @Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样
@Injectable({
  providedIn: 'root'
})

//在把service注入到componets之前，必须把service provide给DI
//注入HeroService
constructor(private heroService: HeroService) { }

// 这里用public，因为要在组件中用到到，所以必须是公共属性
constructor(public messageService: MessageService) {}
```
###异步 rxJS
```js
// Observable 是 RxJS 库中的一个关键类
// Angular HttpClient.get()会返回 RxJS 的 Observable
import { Observable, of } from 'rxjs';
// of(HEROES) 会返回一个 Observable<Hero[]>
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
// Observable.subcribe(hero=>this.hero=hero)在等到异步返回后，subcribe会把值传给回调

// RxJS 的 tap 操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来,tap 回调不会改变值本身。
// http.get获取数据
this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    tap(_=>this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes',[]))
  )
// 详情页调用组件查询
getHero():void{
  const id=+this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
  .subscribe(hero => this.hero = hero);
}

// http.delete删除数据 -- http.delete<Hero>(url, httpOptions)
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
// 组件调用
this.heroService.deleteHero(hero).subscribe();

// http.put修改数据
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
this.http.put(url,data,httpOptions).pipe(
  tap(_ => this.log(`updated hero id=${hero.id}`)),
  catchError(this.handleError<any>('updateHero'))
)

// http.post保存数据
addHero(hero: Hero):Observable<any>{
  return this.http.post(this.heroesUrl,hero,httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
// 组件调用 -- as是用来做数据类型指定,hero拿到接口的数据
this.heroService.addHero({ name } as Hero).subscribe(hero => {});
```
###列表搜索
```js
// $ 是一个命名惯例，用来表明 heroes$ 是一个 Observable，而不是数组
// *ngFor 不能直接使用 Observable，它后面有一个管道字符（|）跟着一个 async，表示 Angular 的 AsyncPipe
// AsyncPipe 会自动订阅到 Observable，这样你就不用再在组件类中订阅了
<li *ngFor="let hero of heroes$ | async" >
//组件页
// Subject 既是可观察对象的数据源，本身也是 Observable。 你可以像订阅任何 Observable 一样订阅 Subject
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
// 属性与方法
heroes$: Observable<Hero[]>;
// searchTerms 属性声明成了 RxJS 的 Subject 类型
private searchTerms = new Subject<string>();
search(term: string): void {
  // 通过调用Subject的 next(value) 方法往 Observable 中推送一些值
  this.searchTerms.next(term);
}
// ngOnInit() 往 searchTerms 这个可观察对象的处理管道中加入了一系列 RxJS 操作符，用以缩减对 searchHeroes() 的调用次数，并最终返回一个可及时给出英雄搜索结果的可观察对象（每次都是 Hero[] ）
ngOnInit(): void {
  this.heroes$ = this.searchTerms.pipe(
    // 在传出最终字符串之前将会等待，直到事件暂停了 300 毫秒
    debounceTime(300),

    // 会确保只在过滤条件变化时才发送请求
    distinctUntilChanged(),

    // 会为每个从 debounce 和 distinctUntilChanged 中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。但并不会中止尚未完成的 HTTP 请求，只会在不想要的结果抵达前端前舍弃
    switchMap((term: string) => this.heroService.searchHeroes(term)),
  );
}
// PS:组件类中并没有订阅 heroes$ 这个可观察对象，而是由模板中的 AsyncPipe 完成的
```
###handleError
```
/**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
```
###HTTP
```js
// HttpClient 是 Angular 通过 HTTP 与远程服务器通讯的机制
// HttpClientModule启用HTTP服务
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
```
###路由
```js
// Add the AppRoutingModule  路由模块
ng generate module app-routing --flat --module=app
// --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
// --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

// forRoot:把 RouterModule 添加到 @NgModule.imports 数组中，并用 routes 来配置它。你只要调用 imports 数组中的 RouterModule.forRoot() 函数就行了
imports: [ RouterModule.forRoot(routes) ],

// app component下的<router-outlet> 会告诉路由器要在哪里显示路由的视图

// component
<a routerLink="/heroes">Heroes</a>

// 默认路由
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// 动态路由
{path:'detail/:id',component:HeroDetailComponent},

// 路由-接受参数
// route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后
// paramMap 是一个从 URL 中提取的路由参数值的字典
+this.route.snapshot.paramMap.get('id');

// 返回上一步
// components的countructor引入
private location: Location
this.location.back();
```
```js
//ngOnInit 生命周期钩子
```
###父子传值
```js
//[hero]="selectedHero" 是 Angular 的属性绑定语法，父组件通过[hero]='val'，绑定子组件中的 hero 属性。
<app-hero-detail [hero]="selectedHero"></app-hero-detail>

//@Input() 装饰器 可接受父组件传值，让 hero 属性可以在外部的 HeroesComponent 中绑定
import { Input } from '@angular/core';
@Input() hero: Hero;
```

```js
module模块/model模型
provide 提供
Injectable 可注射的
subscribe 订阅
Observe 观察
Observable 可观察的
dashboard 仪表盘

@NgModule 模块装饰器，包含组件、服务、导入其他模块功能、导出指定功能供其他NgModul使用
@Component 组件装饰器
```
