## 보안

  - __사용자 가입과 로그인__
    1. 가입 : 사용자 정보를 저장
    2. 로그인 : 사용자 정보를 전송

  - __비밀번호 저장__
    - 비밀번호 암호화 저장
    - 복호화가 필요없음 ( __복호화 : 암호화 된 데이터를 다시 원본데이터로 복구시키는 과정__ )

  - __네트워크로 데이터 전송__
    - 데이터 암호화 - 전달
    - 전달 받은 암호화된 데이터 복호화

---
### 암호화 종류
  - 복호화가 불가능한 암호화(해쉬 알고리즘 이용)
  - 복호화가 가능한 암호화

### 암호화/복호화
  - __암호화(encryption)__
    - 원본 데이터를 변조해서 알 수 없도록 변환

  - __복호화(decryption)__
    - 암호화된 데이터에서 원본데이터(__평문__) 얻기

  - 사용자 비밀번호 암호화 저장
    - 복호화 불필요
    - 해시(__hash__) 알고리즘 사용


  - 사용자 개인 정보 전송
    - 복호화 필요
    - 대칭/비대칭 키 암호화
    - HTTPS



---


### HASH 알아보기
  - __해시란?(hash)__
    - 단방향으로 생성하는 값, 함수

  - __해시 특징__
    - 고정 크기의 해쉬값
    - 입력값이 같으면 해시값도 같다.
    - 해시값이 같아도 입력값 (평문)이 같다는 보장은 없다.

  - __주요 hash 알고리즘__

    - __MD5__(Message Digest5)
      - 1991년
      - 128bit 암호화 해시 함수
      - 결함 발견 - 보안 용도로 사용을 권장하지 않음.
      - 사용 예 : fingerprint

    - __SHA__(Secure Hash Algorithm)
      - SHA0, SHA1, SHA2(256, 512, ...)
      - SHA1 : 160bit
      (SHA1 또한 최근의 보안상의 결함으로 여러곳에서 지원하지 않고있음)

 - __해시 사용예__
    - 전송 데이터 에러 검사 : Checksum
    - 다운로드 받은 후에 전송값을 hash로 변환에서 다운받은 파일이 변조등이 있는지 확인하는 과정


 - __해시 사용예2__
    - 사용자 비밀번호 저장
    -  암호 대신 비밀번호의 해쉬값 저장
    ![hashpassword](/assets/hashpassword.png)


 - __위에 예제를 통한 사용자 인증시__
  ```javascript
    app.post("/login" ,function (req, res) {
        var password = req.body.password;
        var user = user.findOne(username);
        if( hash(password) === user.password ){
            // 인증 성공
        }
    });
  ```

 - __해시 암호 공격__
    - 사전, 자주 사용하는 암호 기반의 해쉬 테이블(레인보우 테이블) 준비
    - 사용자의 해시 암호와 비교
    - 무차별 입력(brute force), 룩업 등

![hash rainbowtable](</assets/hash rainbowtable.png>)
  - 위와같이 해쉬값 끼리 비교해서 비밀번호를 얻어낼 수 있음.

 - __해결방안 ?__
    - 사용자의 암호에 소금(SALT)치기
    - HASH(사용자 암호 + 임의의 문자)
    - HASH("charlie" + "!");
    - 문자열 하나만 더 추가 되어도 Hash값은 완전히 바뀌기 떄문에 레인보우 테이블 사용 불가


- __SALT사용시 주의사항 ?__
  - 사용자마다 다른 SALT 사용
  - SALT는 충분히 길게
    - 짧은 SALT ▶ 레인보우 테이블 준비가능
    - 예측 가능한 SALT 사용하지 말 것

- __(입력값 + SALT)의 해쉬 === 데이터베이스에 저장된 해쉬__
 ```javascript
app.post("/login" ,function (req, res) {
    var password = req.body.password;
    var user = user.findOne(username);

   if( hash(password + user.salt) === user.password ){
        // 인증 성공
    }
});
```
---

### 암호화 모듈
  - __crypto__ : 기본모듈
  - __bcrypto__ : 확장 모듈
  - 설치
    > $ npm install bcrypto


### crypto module

  - __hash 기능__
```javascript
//hash 알고리즘에 대한 기능들을 얻어냄
crypto.getHashes();

//hash 알고리즘을 인자로 넘겨 hash를 생성함
crypto.createHash(algorithm);

hash 알고리즘 list
md5, sha1, sha256, sha512
```
 - __hash 값 만들기(예제code)__
```javascript
var sha256 = crypto.createHash("sha1");
sha1.update("hello");
var digest = sha1.digest("hex");

//5d41402abc4b2a76b9719d911017c592
console.log("sha256 : %s" , digest);
```


- __crypto 모듈의 hash와 Salt__
```javascript
function signup(id, password, name) {
    var sha256 = crypto.createHash("sha256");

    //Salting
    var salt = crypto.randomBytes(5).toString("hex");
    sha1.update(password + salt);
    var hashed_password = sha1.digest("hex");
}
```

- __사용자 입력 암호와 저장된 값 비교__
```javascript
function login(id, password) {
  var sha256 = crypto.createHash("sha256");
  var salt = user.salt;
  sha1.update(password + salt);
  var digest = sha1.digest("hex");

  //Salting한 암호와 사용자 암호 비교

  if ( user.passwrod === digest ){
      //로그인 성공~
  }
}
```

---

## 암호화

  - 암호화의 종류?
    - __대칭 암호 (symmetric cryptography)__
    - __비대칭 암호(Asymmentric cryptography)__

### 대칭 암호(symmetric cryptography)
  - 특징
      - 같은 키로 암호화/복호화
      - 키를 분배해야한다.


  - __대칭암호화 구조__

![대칭암호화 구조](</assets/대칭암호화 구조.png>)   


  - __알고리즘__
    - DES( Data Encryption Standard )
      - 56bit
      - AES로 대체
    - AES( Advanced Encryption Standard )
      - 레인달(Rijndael)알고리즘

<br>


### 비대칭 암호(Asymmentric cryptography)

  - __특징?__
    - 서로 다른 키( 개인키, 공개키 )로 암호화/복호화
    - 개인키(private key) : 공개 안함
    - 개인키로 암호화 ▶ 공개키로 복호화
    - 공개키로 암호화 ▶ 개인키로 복호화
    - 대칭 암호에 비해서 느리다.

  - __비대칭 암호화 구조__
![비대칭 암호화 구조](</assets/비대칭 암호화 구조.png>)

---

### Crypto module 암호화 / 복호화  클래스

  - __암호화 클래스 :__ Cipher
```javascript
var cipher = crypto.createCipher();
cipher.update();
cipher.final();


//암호화 사용방식 예제 (AES128 알고리즘)
var key = "my Secret key";
var cipher = crypto.createCipher("aes128", key);
//메시지 암호화
var message = "hello world";
var encrypted = cipher.update(message, "utf8","hex");
encrypted += cipher.final("hex");
```


  - __복호화 클래스 :__ Decipher
  ```javascript
  var decipher = crypto.createDecipher();
  decipher.update();
  decipher.final();

  //복호화 사용방식 예제 (AES128 알고리즘)
  var decipher = crpto.createDecipher("aes128" ,key);
  var decrypted = decipher.update(msg, "hex", "utf8");
  decrypted += decipher.final("utf8");

  ```


---


## 보안서버 만들기 (HTTPS)

  - __HTTPS__ ? (HTTP over SSL)
    - 데이터 암호화 통신

  - __SSL__ ?
    - 넷스케이프 SSL → IETF의 TLS
    - 대칭키 암호화 방식
  - __SSL 인증서__
    - 서비스를 제공하는 서버의 정보
    - 신뢰성 있는 인증 기관(CA)의 서버 인증
    - 서버 공개키 : 비대칭 암호화용

  - __인증서 발급 ?__
    - 공인된 인증 기관에서 인증서 발급
      - 유료입니다..
      - 인증 기관 : Verisign, Comodo

    - 사설인증서 발급
      - 키와 인증서 생성 프로그램 : openSSL
      - 홈페이지(http://www.openssl.org)
      - 인증기관에서 인증을 받은게 아니기때문에 warning을 발생 시킵니다.


- __사설 인증서로 보안서버 만들기__
  - 만들기 위해 필요한것 ?
    - 키(key)
    - 인증서

  - 인증서 발급 단계
    1. 키 생성
    2. 키에서 인증서 발급 요청(csr) 생성
    3. 인증서 발급 요청에서 인증서 발급

  - open SSL 설치후
    - private 키 생성
    >$ openssl genrsa -out key.pem 2048

  - 인증서 발급요청
    >$ openssl req -new -key key.pem -out req.csr

  - 인증서 발급 승인
    >$ openssl x509 -req -in req.csr -signkey key.pem -out cert.pem -days 365

  - 서버 생성
    - https 모듈 사용
    - 보안 서버 생성
```javascript
var https = require("https");
https.createServer(option ,[Request Listener])

options
  key
  cert
  passphrase : 개인키 암호
```


  - 서버생성 예제

```javascript
var http = require("http"),
https = require("https")

var options = {
  key : fs.readfileSync("./key.pem"),
  cert : fs.readfileSync("./cert.pem")
};
https.createServer(options, function (req, res) {}).listen(3001);

http.createServer(options, function (req, res) {}).listen(3000);
```

- Express 사용 예제

```javascript

var express =require("express"),
http = require("http"),
https = require("https")

var app = express();
http.createServer(app).listen(3000);

var options = {
key : fs.readfileSync("./key.pem"),
cert : fs.readfileSync("./cert.pem")
};

https.createServer(options, app).listen(3001);
```
---

### 보안서버 의무화

- 영리 목적으로 하는 개인정보 수집 서비스는 보안서버가 의무화 되있습니다.

- 무료
  - https://www.startssl.com
  - https://letsencrypt.org
- 유료
  - verisign(https://www.verisign.com/)
  - symantec(https://www.symantec.com/)
  - comodo(https://www.comodo.com/)
