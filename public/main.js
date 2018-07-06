function addFriend(e) {
    let name = document.getElementById('name').value,
        age = document.getElementById('age').value,
        profilePic = document.getElementById('profilePic').files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", _ => {
        let base64Data = reader.result
        axios.post('/friends/add', {
            name: name,
            age: age,
            profilePic: base64Data
        }).then(data => {
            console.log(data);
        })
    });
    reader.readAsDataURL(profilePic);
}
function renderFriends() {
    axios.get('/friends/list').then(data => {
        data.data.friends.forEach(item => {
            document.getElementById('friends').innerHTML += `<li class="eachFriendLI"><img class="eachFriendImg" src="${item.profilePic}" /> ${item.name} ${item.age}</li>`
        });
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

        console.log();
    var reader = new FileReader();

    reader.addEventListener("loadend", _ => {
        let base64Data = reader.result
        axios.post('/signUp', {
            name,
            age,
            profilePic: base64Data,
            mobileNumber,
            password
        },{}).then((data,status) => {
            console.log(1111111111111111,data,status);
        }).catch(err=>{
            console.log('errrrrrrrrrrrrrrrr',err);
        })
    });

    reader.readAsDataURL(profilePic);

}