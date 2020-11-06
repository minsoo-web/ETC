# 제이쿼리(jQuery)란

오픈소스 기반의 자바스크립트 라이브러리입니다. 제이쿼리를 이용하면 문서 객체 모델(DOM)과 이벤트에 관한 처리를 손쉽게 구현할 수 있습니다. 또한 Ajax 응용프로그램 및 플러그인도 제이쿼리를 활요하여 빠르게 개발할 수 있습니다.

## 제이쿼리 버전 

제이쿼리는 jQuery Foundation을 통해 버전 개발 및 유지보수가 진행되고 있습니다.

제이쿼리 버전1은 익스플로러 ,6,7,8 버전에서의 동작까지 모두 지원하는 버전입니다.

제이쿼리 버전2는 버전1에서 지원하는 6,7,8 버전에 대한 지원을 중단한 버전입니다.

제이쿼리 버전3은 2014년 10월에 배포된 제이쿼리 표준입니다. 제이쿼리 버전 3은 기존 버전과의 호환성을 유지한 간결하고 빠른 라이브러리로 변경되었습니다.

* 제이쿼리 버전2와 버전3은 모두 익스플로러 9 이상에서만 동작합니다. 이 때문에 아직도 많은 웹사이트에서 제이쿼리 버전 1을 사용하고 있습니다.

## 제이쿼리 적용

제이쿼리는 자바스크립트 라이브러리이므로, 제이쿼리 파일은 자바스크립트 파일(.js) 형태로 존재합니다. 따라서 웹 페이지에서 제이쿼리를 사용하기 위해서는 제이쿼리 파일을 먼저 웹페이지에 로드해야 합니다. 

1. jQuery 파일을 다운받아 로드하는 방법
   * Download the compressed, production jQuery 3.4.1 `--> 다운받아 그대로 사용하는 파일`
  
   * Download the uncompressed, development jQuery 3.4.1 `--> 오픈소스 기반으로 수정하여 사용하는 파일`

2. jQuery CDN(Content Delivery Network)을 추가하여 사용하는 방법 
   * GoogleCDN : `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>`
  
   * MicroSoft : `https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.js`
   * jsDelivr :  `https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js`
   * CDNJS CDN : `https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js`

## 제이쿼리 문법 

`$("선택자").동작함수();`

$ : 제이쿼리의 시작을 알리는 식별자 

```javascript
1. $(document).ready(function(){
})

2. $(function(){

})

3. window.onload = function(){

}

// 1,2번과 3번은 같은 표현
```

### 선택자 

* p:eq(n) n 번째 위치하는 문서 객체를 선택  

* 요소:gt(n) n 번째 초과
* 요소:lt(n) n 번째 미만에 위치하는 문서 객체
* 요소:even 선택한 요소 중 짝수
* 요소:odd 선택한 요소 중 홀수
* 요소:first 선택한 요소 중 첫번째
* 요소:last 선택한 요소 중 마지막
* 요소:animated 선택한 요소 중에서 애니메이션 효과가 실행중인 요소
* 요소:header 선택한 요소 중에서 h1~h6 모두 선택
* 요소:not(선택자) 선택한 요소중 지정한 선택자와 일치하지 않은 모든 선택자
* 요소:root  선택한 요소중에서 최상위 루트 요소를 선택합니다.
* 요소:target 선택한 요소 중에서 웹페이지 URI 의 fragment 식별자와 일치하는 모든 선택자

## getter 메소드와 setter 메소드 

선택자에 의해 선택된 요소의 값을 읽거나 설정하기 위해서는 제이쿼리 메소드를 통해 해당 요소에 접근해야만 합니다. 

getter 메소드는 선택된 요소에 접근하여 그 값을 읽어오기 위한 메소드 입니다.  
getter 메소드는 아무런 인수를 전달하지 않고 호출합니다.

반대로 setter 메소드는 선택된 요소에 접근하여 그 값을 설정하기 위한 메소드입니다.  
setter 메소드는 대입하고자 하는 값을 인수로 전달하여 호출합니다.

```javaScript
// <p>M</p>
var html = $("p").html();
$("p").html("modify");
```

* html() : 해당 요소의 HTML 콘텐츠를 반환하거나 설정합니다.

* text() : 해당 요소의 텍스트 콘텐츠를 반환하거나 설정합니다.
* width() : 선택한 요소 중에서 첫 번재 요소의  너비를 픽셀 단위의 정수로 반환하거나 설정합니다.
* height() : 위와 동일한 기능에서 높이를 설정하거나 반환
* attr() : 해당 요소의 명시된 속성의 속성값을 반환하거나 설정합니다.
* val() : form 요소의 값을 반환하거나 설정합니다.
* position() : 선택한 요소 중에서 첫 번째 요소에 대해 특정 위치에 존재하는 객체를 반환합니다. (getter 메서드)
