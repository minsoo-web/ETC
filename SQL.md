# DATABASE :

저장소, 데이터를 통합하여 관리하는 집합체를 의미합니다.

## DATABASE 를 사용하는 이유

1. 중복된 데이터를 없애고, 자료를 구조화시키고, 효율적인 처리를 할 수 있도록 관리해줌
2. 다양한 프로그램을 사용하는 사용자들과의 데이터를 공유할 수 있습니다.

## SQL (Structured Query Language)

데이터베이스에서 데이터를 정의, 조작, 제어하기 위해 사용하는 언어입니다.

- 대소문자를 구별하지 않습니다.
- 따옴표는 문자열을 저장할때 '' (싱글따옴표)만 사용합니다.

---

### 데이터베이스 생성

`CREATE DATABASE phpstudy;`

### 데이터베이스 확인

`show databases;`

### 데이터베이스 삭제

`drop database <데이터베이스 이름>`

### 데이터베이스 선택

`use <데이터베이스 이름>`

### 테이블 생성

```sql
CREATE table <테이블명>(
    필드명1 필드타입1 제약조건,
    필드명2 필드타입2 제약조건,
    필드명3 필드타입3 제약조건,
    ...
)
```

### 테이블 구조 확인

`desc 테이블명;`

### 필드 추가

alter table 테이블명 add 필드이름 필드타입 제약조건;  
`ALTER TABLE tb_member ADD mem_hobby VARCHAR(100);`

> 데이터가 이미 존재하는 테이블에 필드 추가시  
> not null 제약조건은 사용할 수 없다.

### 필드 수정

alter table 테이블명 modify column 필드명 필드타입 제약조건;  
`alter table tb_member modify column mem_point int default 1000;`

### 필드 삭제

alter table 테이블이름 drop 필드이름;  
`alter table tb_member drop mem_hp;`

### 데이터 삽입 (INSERT)

1. insert into 테이블명 values ('값1','값2',...);
   > 선택한 필드에 선택한 값만 넣을 수 없음  
   > 모든 필드에 순서에 맞게끔 입력을 해주어야 함
2. insert into 테이블명 (필드명1,필드명2,....) values ('값1','값2',...);

### 데이터 수정 (UPDATE)

1. update 테이블명 set 필드1=값1, 필드2=값2 ...
   - 모든 필드 값을 설정할 때
   - `UPDATE tb_member set mem_point=mem_point+100;`
2. update 테이블명 set 필드1=값1, 필드2=값2 ... where 조건절
   - 조건에 맞는 필드값들만 설정
   - `UPDATE tb_member set mem_hobby='드라이브' WHERE mem_hobby='맛집투어';`

### 데이터 삭제 (DELETE)

1. DELETE FROM 테이블명;
   - `DELETE FROM tb_member;`
2. DELETE FROM 테이블명 WHERE 조건절;
   - `DELETE FROM tb_member WHERE mem_idx=12;`

### 검색 (SELECT)

1. SELECT 필드명1, 필드명2, .... FROM 테이블명;
   - `SELECT mem_idx, mem_userid, mem_pass FROM tb_member;`
2. SELECT 필드명1, 필드명2, .... FROM 테이블명 WHERE 조건절;
   - `SELECT mem_idx, mem_userid, mem_pass FROM tb_member WHERE mem_idx=1;`
3. SELECT 필드명1, 필드명2, ... FROM order by 정렬할 필드명 ASC (또는 DESC);
   - ASC : 오름차순
   - DESC : 내림차순
   - `SELECT mem_point FROM tb_member ORDER BY mem_point DESC;`
   - **2차 정렬** (가입자순) : DESC , mem_idx 이렇게 작성
4. SELECT 그룹을 맺은 필드 또는 **집계함수** FROM 테이블명 GROUP BY 그룹을 맺을 필드 HAVING 그룹에 해당하는 조건절;
   - having : group by 쿼리의 결과를 다시 필터링 하기 위한 조건식
   ```sql
   SELECT mem_gender, sum(mem_point) FROM tb_member
   GROUP BY mem_gender HAVING sum(mem_point) > 12000;
   ```
   - sum(mem_point) 는 필드명이 없다. php 에서 데이터를 뽑아올 때 문제가 생김
   - index로 뽑아올 수도 있지만 좋은 방법이 아님
   - as : 필드 별칭을 줍니다. `sum(mem_point) as mem_sum`
   - 집계함수
     - count() : 그룹을 맺은 레코드의 수를 출력
     - sum() : 그룹을 맺은 필드의 값의 합계를 출력
     - max() : 그룹을 맺은 필드의 최대값을 출력
     - min() : 그룹을 맺은 필드의 최소값을 출력
     - avg() : 그룹을 맺은 필드의 평균을 출력
   - WHERE 절과 결합 할 경우
   ```sql
   SELECT mem_gender, AVG(mem_point) FROM tb_member WHERE mem_point > 1700
   GROUP BY mem_gender HAVING AVG(mem_point)>2300;
   ```

### 테이블 병합 (JOIN)

SELECT 컬럼1, 컬럼2, 컬럼3... FROM 테이블1 (INNER, LEFT, RIGHT)  
JOIN 테이블2 ON 테이블1.필드명 = 테이블2.필드명

```sql
SELECT mem_userid,mem_name, ord_number, ord_proidx, ord_price FROM tb_member
-- 보고 싶은 필드를 고르고
INNER JOIN tb_order ON tb_member.mem_idx = tb_order.ord_useridx;
-- 그 필드 안에 병합할 필드를 선정한 후에 어떤 값이 같은지를 명시 해준다.
```

---

## 테이블이란?

데이터를 행과 열로 스키마에 따라 저장할 수 있는 구조

> 스키마 :  
> 데이터 베이스의 구조와 제약 조건에 관한 명세를 기술한 집합을 의미합니다.

열 -> field , column , attribute  
행 -> row, record, tuple

## 데이터 타입

1. 숫자 타입
   - 정수 : (tinyint, smallint, mediumint,) int, bigint
   - 소수 : float, double
2. 문자열 타입
   - 텍스트 : char, vachar, text
   - 바이너리 : binary, varbinary
   -
3. 날짜와 시간 타입
   - 날짜 : date
   - 날짜와 시간 : datetime, timestamp

## 데이터의 제약 조건

데이터의 무결성을 지키기 위해 데이터를 입력받을 때 실행하는 검사 규칙입니다.

1. NOT NULL

   - 해당 필드에 NULL 값을 저장할 수 없게 합니다. (필수 데이터)

2. UNIQUE

   - 해당 필드는 서로 다른 값을 가져야 합니다. (중복 데이터 x)
   - 단, NULL 값은 저장 가능

3. DEAFAULT

   - 해당 필드의 기본값을 설정할 수 있게 해줍니다.

4. AUTO_INCREAMENT

   - 해당 필드는 자동으로 숫자가 증가되어 추가됩니다.
   - 따라서 직접 데이터를 추가할 수 없습니다.

5. PRIMARY KEY

   - 해당 필드는 오직 하나의 필드에만 설정할 수 있습니다.
   - 해당 필드는 NOT NULL과 UNIQUE의 특징을 모두 갖습니다.
   - 데이터를 쉽고 빠르게 찾도록 도와주는 역할을 합니다. (index 기능)
   - 외래키가 (FOREIGN KEY) 참조할 수 있도록 만들어줍니다.

6. FOREIGN KEY (참조키 외래키)
   - 다른 테이블과 연결해주는 역할을 합니다.  
     기준이 되는 테이블의 내용을 참조해서 레코드가 입력됩니다.
   - 다른 테이블에 의존하는 필드가 됩니다.
   - 기본키를 참조합니다.

## 연산자

1. 산술 연산자

   - +, -, \*, /, DIV (왼쪽 연산자를 오른쪽 연산자로 나눈 후, 소수 부분을 버림), % 또는 MOD

2. 대입 연산자

   - = (같다x, 대입), :=(왼쪽 연산자에 오른쪽 연산자를 대입)

3. 비교 연산자
   - =(같다, 대입x), != 또는 <>, >, <, >=,<=
   - <=> 양쪽의 연산자가 모두 null 이면 참을 반환 하나의 연산자 또는 모두 null이 아니면 거짓을 반환
   - is not 왼쪽 연산자와 오른쪽 연산자가 다르면 참을 반환
   - is null 연산자의 값이 null이면 참을 반환
   - is not null 연산자의 값이 null이 아니면 참을 반환
   - between A and B 값이 A 보다는 크거나 같고 B 보다 작거나 같으면 참을 반환
   - in() 연산자의 값이 인수로 전달받은 리스트에 존재하면 참을 반환

## 테이블 병합 (JOIN)

데이터베이스 내의 여러 테이블에서 가져온 레코드를 조합하여  
하나의 테이블이나 결과 집합으로 표현해 줍니다.

## PHP 와 DBMS 와의 연결

_mysqli_connect("접속ip","아이디","비밀번호","데이터베이스")_

```php
$conn = mysqli_connect("localhost", "root", "1234", "phpstudy")
or die("데이터베이스 연결 실패!");
```

## PHP에서 DBMS에 Query 실행

_mysqli_query(접속객체,실행할쿼리);_

```php
$sql = "INSERT INTO tb_member (
        mem_userid,mem_pass,mem_name,mem_email,
        mem_gender,mem_ssn, mem_zipcode,mem_address1,
        mem_address2,mem_address3,mem_hobby)
        VALUES (
            'kimred', PASSWORD('1111'), '김레드','red@naver.com',
            '남자','9506111234567','06633','서울시 강남구',
            '방배로 15길','30층','코딩')";
    $result = mysqli_query($conn, $sql); // 적용된 결과의 갯수 리턴;
    echo "{$result}개의 데이터가 정상적으로 insert 되었습니다.";
```
