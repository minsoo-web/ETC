function checkForm() {
  // 아이디 체크
  var idCheck = RegExp(/^[a-zA-Z0-9]{4,16}$/);
  if (!idCheck.test($("#userid").val())) {
    alert("아이디 형식에 맞게 쓰세요");
    $("#userid").val("");
    $("#userid").focus();
    return false;
  }
  var pwCheck = RegExp(
    /^.*(?=^.{8,16})(?=.\d)(?=.*[a-zA-z])(?=.*[?!@#$%^&*]).*$/
  );
  if (!pwCheck.test($("#userpw").val())) {
    alert("비밀번호를 형식에 맞게 쓰세요");
    $("#userpw").val("");
    $("#userpw").focus();
    return false;
  }
  var pwCheckRe = $("#userpw").val();
  if ($("#userpw_re").val() !== pwCheckRe) {
    alert("비밀번호가 일치하지 않습니다.");
    $("#userpw_re").val("");
    $("#userpw_re").focus();
    return false;
  }
  // 한글 검증
  var nameCheck = RegExp(/^[가-힣]+$/);
  if (!nameCheck.test($("#user_name").val())) {
    alert("이름은 한글로만 입력하세여");
    $("#user_name").val("");
    $("#user_name").focus();
    return false;
  }
  // 이메일 검증
  var emailCheck = RegExp(/^[a-zA-z0-9_\.\-]+@[a-zA-z0-9\-/]+\.[a-zA-z0-9\-]+/);
  if (!emailCheck.test($("#user_email").val())) {
    alert("이메일");
    $("#user_email").val("");
    $("#user_email").focus();
    return false;
  }
  // 취미 한 개 이상 선택 검증
  var hobby = $("input[name='hobby']:checked");
  if (hobby.length === 0) {
    alert("취미를 선택해 주세요");
    return false;
  }

  // 주민등록번호
  if ($("#ssn1").val() == "" || $("#ssn2").val() == "") {
    alert("주민등록번호를 입력하세요");
    $("#ssn1").focus();
    return false;
  }

  // hp
  var hpCheck = RegExp(/^\d{3}-\d{3,4}-\d{4}$/);
  if (!hpCheck.test($("#hp").val())) {
    alert("휴대폰 번호를 알맞게 입력하세요");
    $("#hp")
      .val("")
      .focus();
    return false;
  }
}
$(function() {
  // 6글자가 넘으면 자동으로 포커스 이동
  $("#ssn1").keyup(function() {
    if ($(this).val().length == 6) {
      $("#ssn2").focus();
    }
  });

  // 유효성 검사
  $("#checkssn").click(function() {
    var ssn = $("#ssn1").val() + $("#ssn2").val();
    var fmt = RegExp(/^\d{6}[12345]\d{6}/);
    if (!fmt.test(ssn)) {
      alert("주민등록번호를 알맞게 작성하세요");
      $("#ssn1").val("");
      $("#ssn2").val("");
      $("#ssn1").focus();
      return false;
    }
    var arr = new Array(13);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseInt(ssn.charAt(`${i}`));
    }
    var mul = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    var sum = 0;

    for (let i = 0; i < 12; i++) {
      sum += arr[i] *= mul[i];
    }
    if ((11 - (sum % 11)) % 10 != arr[12]) {
      $("#ssn1").val("");
      $("#ssn2").val("");
      alert("유효하지 않은 주민번호");
      return false;
    }
    $("#endSsn").val("yes");
    var birthYear = ssn.charAt(6) <= "2" ? "19" : "20";
    birthYear += $("#ssn1")
      .val()
      .substr(0, 2);
    var birthMonth = $("#ssn1")
      .val()
      .substr(2, 2);
    var birthDay = $("#ssn1")
      .val()
      .substr(4, 2);

    $("#year").val(birthYear);
    $("#month").val(birthMonth);
    $("#day").val(birthDay);
  });
});

//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}
