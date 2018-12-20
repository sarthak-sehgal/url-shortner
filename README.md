# URL Shortner
## <a href="https://url-shortner-99.herokuapp.com/" target="_blank">Demo</a>
<img src="https://i.imgur.com/3UPZ0di.png" alt="URL Shortner" height="400" />

URL shortner made using NodeJS and MongoDB served over Heroku at <a href="https://url-shortner-99.herokuapp.com/" target="_blank">https://url-shortner-99.herokuapp.com/</a>.

## Setup locally
### Prerequisites
 - <a href="https://docs.mongodb.com/manual/installation/" target="_blank">MongoDB</a>

### Instructions
```
    git clone https://github.com/sarthak-sehgal/url-shortner
    cd url-shortner
    npm install
```
#### In server.js
 - Change BASE_URL to "http://localhost:8000/"
 - Change dbUrl to your local MongoDB database URL

#### In public/main.js
 - Change URL to "http://localhost:8000/shorten"