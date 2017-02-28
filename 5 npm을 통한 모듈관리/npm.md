## npm을 통한 module 관리 알아보기

- npm ?
  - __Node.js Package Manager__ 의 약자
  - nodejs의 모듈생태계는 commonjs라는 라이브러리를 채택하고있음
  - npm 내에서 모듈을 탐색하고 저장한다.
  - node.js module 설치와 버전관리 및 호환성을 관리할 수 있는 유틸이다.
  - npm은 nodejs 설치시 함께 설치됨.


  - 모듈 작성해보기
```javascript
//commonjs는 파일별로 단독적인 scope영역을 가지고 있으며 require("모듈명");으로 호출가능
module.exports.goodmoning = function(){
   console.log("asdsadsad");
};
  ```


- 커맨드라인(CMD) 명령어 보기

  | 명령 | 뜻 |
  | :------------: | :------------ |
  | npm init | packege.json 설정파일 생성 |
  | npm install  | packege.json 안에 기록된 의존성 모듈 설치 |
  | npm install 모듈명 | 모듈명을 찾아서 설치함 |
  | npm list | 설치된 모듈목록 |
  | npm info | 모듈정보 |
  | npm update | 모듈업데이트 |
  | npm uninstall | 모듈삭제 |

- 모듈설치
  - 전역(global) 설치와
  - 지역(local) 설치가 존재함

- 전역설치
```javascript
$ npm install moduleName -g || $ npm install -g moduleName
// 전역설치는  npm install 모듈명 -g 옵션을 붙여주면됨 관리자 권한필요
// 위치는 운영체제와 시스템별로 다름
// 모든곳에서 사용가능
```

- 지역 설치
```javascript
// -g 라는 글로벌옵션이 없으면 무조건적인 지역설치가됨
$ npm install moduleName
// 지역설치는 프로젝트마다 설치 default는 지역설치이며
// 현재 폴더 하위에 node_modules 라는 폴더생성 후 그 폴더안에 설치됨.
$ npm install jade@1.0.0  // @는 버전을 기입할 수 있다. default는 최신버전 설치
```

- 왠만하면 지역모듈을 권장하며
- 모듈설치시에는 packege.json 을 먼저 생성한 후
- npm install nodemon --save 라는 옵션으로 packege.json에 의존성주입을 해주어야한다.


---

### 포스팅 마치며..



  - __간단하게 Nodejs내에서 모듈생태계 npm과 commonjs 표준을 따르는 모듈작성방식에 대해서 알아보았다.
  어려운 내용은 아니니 잘기억해두자.__


  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
