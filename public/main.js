function renderFriends(data, id,addBTN) {
    data.forEach(item => {
        document.getElementById(id).innerHTML += `
        <li class="eachFriendLI">
        <img class="eachFriendImg" src="${item.profilePic}" />
         ${item.name} Age: ${item.age} ${addBTN?"<button>Add</button>":""}
         </li>`
    });
}
function getElement(ref) {
    return document.querySelector(ref);
}

function signUp() {
    let name = getElement('#name').value,
        age = getElement('#age').value,
        profilePic = getElement('#profilePic').files[0],
        mobileNumber = Number(getElement('#mobileNumber').value),
        password = getElement('#password').value;

    var reader = new FileReader();

    reader.addEventListener("loadend", _ => {
        let base64Data = reader.result
        axios.post('/signUp', {
            name,
            age,
            profilePic: base64Data,
            mobileNumber,
            password
        }, {})
            .then((data, status) => {
                localStorage.setItem('token', data.data.token);
                window.location.replace('/dashboard.html');
            })
            .catch(err => {
                console.log('errrrrrrrrrrrrrrrr', err);
            })
    });

    reader.readAsDataURL(profilePic);

}

function logIn() {
    let mobileNumber = Number(getElement('#mobileNumber').value),
        password = getElement('#password').value;
    axios.post('/signIn', { mobileNumber, password })
        .then((data, status) => {
            localStorage.setItem('token', data.data.token);
            window.location.replace('/dashboard.html');
        })
        .catch(err => {
            console.log(err);
        });
}

function fetchFriends() {
    axios.get('/friends/')
}

async function findFriend() {
    let mobileNumber = getElement('#mobNumber').value;
    axios.get(`/friends/find?mobileNumber=${mobileNumber}`, {
        headers: {
            Authorization: await localStorage.getItem('token')
        }
    })
        .then((data, status) => {
            renderFriends([data.data.friend],'foundFriends',true);
        })
        .catch(err => {
            console.log(err);
        });
}