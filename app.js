/* references */
const body = document.querySelector("body");
const searchBox = document.querySelector(".search-box");
const contentBox = document.querySelector(".content-box");
const statBox = document.querySelector(".user-stat-box");
const logo = document.querySelector(".logo");
const toggleDarkButton = document.querySelector(".toggle-button");
const toggleText = document.querySelector(".toggle-text");


var darkMode = false;

toggleDarkButton.addEventListener("click", toggleDarkMode);


function toggleDarkMode() {
    console.log("clicked");
    if (darkMode == false) {
        body.classList.add("dark-body");
        logo.classList.add("dark-mode-text");
        input.classList.add("dark-mode-text");
        searchBox.classList.add("dark-box");
        contentBox.classList.add("dark-box");
        statBox.classList.add("dark-body");
        toggleDarkButton.classList.remove("toggle-dark");
        toggleDarkButton.classList.add("toggle-light");
        toggleText.innerHTML = "light";
        darkMode = true;
    } else {
        body.classList.remove("dark-body");
        logo.classList.remove("dark-mode-text");
        input.classList.remove("dark-mode-text");
        searchBox.classList.remove("dark-box");
        contentBox.classList.remove("dark-box");
        statBox.classList.remove("dark-body");
        toggleDarkButton.classList.add("toggle-dark");
        toggleDarkButton.classList.remove("toggle-light");
        toggleText.innerHTML = "dark";
        darkMode = false;
    }
}










/* api */
const locationLink = document.querySelector(".location");
const twitterLink = document.querySelector(".twitter");
const blogLink = document.querySelector(".blog");
const companyLink = document.querySelector(".company");
const input = document.querySelector("input");
const searchButton = document.querySelector(".search-button");
const noResults = document.querySelector(".no-results");

const enterKey = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});

searchButton.addEventListener("click", function() {
    noResults.classList.add("hidden");
    console.log("clicked");
    const url = `https://api.github.com/users/${input.value}`;
    fetch(url)
        .then (resp => resp.json())
        .then (Data => {
            console.log(Data);
            if (Data.message == "Not Found") {
                noResults.classList.remove("hidden");
                return;
            }

            document.getElementById("user-icon").style.backgroundImage = `url('${Data.avatar_url}')`;
            document.getElementById("user-icon0").style.backgroundImage = `url('${Data.avatar_url}')`;
            document.getElementById("name").innerHTML = Data.name;
            document.getElementById("login").innerHTML = `@${Data.login}`;

            joinDate = new Date(Data.created_at.slice(0,4), Data.created_at.slice(5,7), Data.created_at.slice(8,10)).toString();
            //console.log(joinDate.slice(4,7)); //month
            //console.log(joinDate.slice(8,10)); //day
            //console.log(joinDate.slice(11,15)); //year
            document.getElementById("join-date").innerHTML = `Joined ${joinDate.slice(8,10)} ${joinDate.slice(4,7)} ${joinDate.slice(11,15)}`

            if (Data.bio == null) {
                document.getElementById("bio").innerHTML = "This profile has no bio";
            } else {
                document.getElementById("bio").innerHTML = Data.bio;
            }

            document.getElementById("repos").innerHTML = `${Data.public_repos}`;
            document.getElementById("followers").innerHTML = `${Data.followers}`;
            document.getElementById("following").innerHTML = `${Data.following}`;

            if (Data.location == null) {
                document.getElementById("location").innerHTML = "Not available";
                locationLink.classList.add("unavailable");
            } else {
                document.getElementById("location").innerHTML = Data.location;
                locationLink.classList.remove("unavailable");
            }

            if (Data.twitter_username == null) {
                document.getElementById("twitter").innerHTML = "Not available";
                twitterLink.classList.add("unavailable");
            } else {
                document.getElementById("twitter").innerHTML = Data.twitter_username;
                twitterLink.classList.remove("unavailable");
            }
            if (Data.blog == "") {
                document.getElementById("blog").innerHTML = "Not available";
                blogLink.classList.add("unavailable");
            } else {
                document.getElementById("blog").innerHTML = `${Data.blog}`;
                blogLink.classList.remove("unavailable");
            }
            if (Data.company == null) {
                document.getElementById("company").innerHTML = "Not available";
                companyLink.classList.add("unavailable");
            } else {
                document.getElementById("company").innerHTML = `${Data.company}`;
                companyLink.classList.remove("unavailable");
            }
        });
})