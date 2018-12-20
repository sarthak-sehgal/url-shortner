function init() {
    document.addEventListener("DOMContentLoaded", function () {
        let shortenBtn = document.getElementById("shortenBtn");

        document.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                shorten();
            }
        })

        shortenBtn.addEventListener("click", function (e) {
            e.preventDefault();

            shorten();
        })
    })

    function shorten() {
        const URL = "https://url-shortner-99.herokuapp.com/shorten";
        let input = document.getElementById("urlInput");
        let alert = document.getElementById("alerts");
        console.log("Button clicked");
        alert.innerHTML = '';
        shortenBtn.disabled = true;
        fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                url: input.value
            })
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById("urlInput").focus();
                if (res) {
                    if (res.status) {
                        alert.innerHTML = `<div class="alert alert-success" role="alert">
                            Your shortened url is <a href='${res.message}' class='alert-link'>${res.message}</a>
                            </div>`;
                    } else {
                        alert.innerHTML = `<div class="alert alert-danger" role="alert">${res.message}</div>`;
                    }
                } else {
                    alert.innerHTML = `<div class="alert alert-danger" role="alert">Server error occurred.</div>`;
                }
                shortenBtn.disabled = false;
            })
            .catch(err => {
                document.getElementById("urlInput").focus();
                alert.innerHTML = `<div class="alert alert-danger" role="alert">Server error occurred.</div>`;
                console.log(err);
                shortenBtn.disabled = false;
            })
    }
}

init();