const params = new URL(document.location).searchParams;
const token = params.get('token');
const button = document.querySelector('.home-button');

function handleClick(e) {
    e.preventDefault();
    if (!token) {
        alert('죄송합니다 ㅠㅠ 로그인 과정에 오류가 발생했습니다.');
        window.location.href = '/login';
        return;
    }
    sessionStorage.setItem('token', token);
    alert(`정상적으로 로그인되었습니다.`);
    console.log(token);
    window.location.href = '/';
}
button.addEventListener('click', handleClick);
