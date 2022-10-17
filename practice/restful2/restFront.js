
async function getUser() {

  console.log('getuser 실행');

  try {

    const res = await axios.get('/users');
    const users = res.data;
    console.log('서버로부터 유저목록을 받습니다', users);

    const list = document.getElementById('list');
    list.innerHTML = '';

    //반복문 돌면서 유저 목록 보여주기
    Object.keys(users).map(function (key) {

      console.log('실행');

      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];

      const edit = document.createElement('button');
      edit.textContent = '수정';


      edit.addEventListener('click', async () => { // 수정 버튼 클릭
        const name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다');
        }
        try {
          const putURL = '/user/' + key;
          const putData = name;
          await axios.put(putURL, {putData})
              .then((response) => {
                console.log('put response : ' + response );
              })
              .catch((err) => {
                console.log('에러발생');
                console.error(err);
              });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });


      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 버튼 클릭
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });




      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);



    })


  } catch (error) {
    console.error(error);
  }
}


window.onload = getUser;

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  //유저 이름 fetch
  const name = e.target.username.value;

  if(!name) {
    return alert('이름 입력해주세요.');
  } else {

    try {
      //유저 이름을 서버로 post 요청한다.

      axios.post('/user', { name });
      //유저 목록을 업데이트 한다.
      getUser();

    } catch (e) {
      console.error(e);
    }

    e.target.username.value = '';

  }


})