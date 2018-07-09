function renderFriends(data, id, addBTN, alreadyFriend, chatBTN) {
    console.log(data);
    data.forEach(item => {
        console.log(item._id);
        document.getElementById(id).innerHTML += `
        <li class="eachFriendLI">
        <img class="eachFriendImg" src="${item.profilePic}" />
         ${item.name} Age: ${item.age} ${addBTN ? `<button onclick='addFriend("${item._id}")'>Add</button>` : ""}
         ${alreadyFriend ? '<button>Added</button>' : ''}
         ${chatBTN ? `<button onClick="startChat('${item._id}')">Chat</button>` : ''}
         </li>`
    });
}

function startChat(id) {
  
}

async function addFriend(id) {
    axios.post('/friends/add', { friendId: id }, {
        headers: {
            Authorization: await localStorage.token
        }
    }).then(data => { console.log(data); }).catch(err => { console.log(err); })
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

async function findFriend() {
    let mobileNumber = getElement('#mobNumber').value;
    axios.get(`/friends/find?mobileNumber=${mobileNumber}`, {
        headers: {
            Authorization: await localStorage.getItem('token')
        }
    })
        .then((data, status) => {
            if (data.data.alreadyFriend) return renderFriends([data.data.foundFriend], 'foundFriends', false, data.data.alreadyFriend);
            renderFriends([data.data.foundFriend], 'foundFriends', true);
        })
        .catch(err => {
            console.log(err);
        });
}
(async function () {
    if (window.location.pathname.indexOf('dashboard') !== -1 || window.location.pathname.indexOf('chat') !== -1) {
        axios.get(`/friendss`, {
            headers: {
                Authorization: await localStorage.getItem('token')
            }
        }).then(data => {
            if (window.location.pathname.indexOf('chat') !== -1) renderFriends(data.data.friends, 'friends', false, false, true);
            else renderFriends(data.data.friends, 'friends');
        })
    }
})();

async function saveFeedBack() {
    let feedBack = getElement('#feedbackT').value;
    axios.post('/feedback', { message: feedBack }, {
        headers: {
            Authorization: await localStorage.getItem('token')
        }
    }).then(data => {
        getElement('#feedbackT').value = '';
    }).catch(err => {
        console.log(err);
    });
}