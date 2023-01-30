let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 80;

app.use(express.static("public_html"));
app.listen(port, function () {
  console.log("html 서버 시작됨");
});
//http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=ID43EM%2FixQiOJbYb9kyZ3coo6DpQnKI7F8BT7LuhMdxB6s%2FNyzBVFAOlvyODT%2Fxf4aFJzFb1hYcGfEP8JrDi9A%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10

app.get("/pharmach_list", (req, res) => {
  //app.get도 비동기형식이기 때문에 동기형으로 바꾸는 작업이 필요하다.
  //pharmach_list 페이지에 접속했을때 접속한 클라이언트에게 보낼 데이터를 정할 수 있다.
  //req는 사용자로부터 전달받은 내용, res는 nodejs에서 클라이언트에게 데이터를 보내는 부분
  let response = null; //초깃값은 null로 설정하고 아래가 실행되면 axios.get을 통해 받는다.
  try {
    //try로 axios를 실행하고 에러발생시 catch문을 실행한다.
    let api = async () => {
      response = await axios.get(
        "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire",
        {
          params: {
            serviceKey:
              "ID43EM%2FixQiOJbYb9kyZ3coo6DpQnKI7F8BT7LuhMdxB6s%2FNyzBVFAOlvyODT%2Fxf4aFJzFb1hYcGfEP8JrDi9A%3D%3D",
            Q0: "서울특별시",
            Q1: "강남구",
            QT: "",
            QN: "",
            ORD: "",
            pageNo: "1",
            numOfRows: "1000",
          },
        }
      );
    }; //nodejs를 통해 api내용을 가지고 오는 이유는 cors보안 문제를 해결하기 위해서이다. 즉, 교차된 리소스보안 문제를 해결하기 위한것.
    api().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); //이 문장을 쓰기위해 nodejs를 쓰는것이다.(cors보안문제 해결)
    });
  } catch (e) {
    console.log(e);
  }
  return response; //사용자가 pharmach_list에 들어왔을때 api결과가 출력된다.
});
