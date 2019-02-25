# Frontend

This project uses many libraries, including:

* [redux](https://redux.js.org/)
* [react router](https://github.com/ReactTraining/react-router)
* [redux saga](https://github.com/redux-saga/redux-saga)

It is also prepared to use
[redux-cli](https://github.com/SpencerCDixon/redux-cli) so you can create new
redux reducers and react containers and components by using:

```bash
npm i redux-cli -g # Install the CLI tool first

redux g duck myreducer
redux g dumb MyComponent
redux g smart MyContainer
```

## Directory structure

Main files and directories of the application

```
frontend
├─ config
├─ public          # Public assets (e.g. images)
├─ scripts
└─ src
   ├─ components   # Dumb components
   ├─ containers   # Smart components (aka containers) that connect to redux
   ├─ redux
   │  ├─ api       # code that intereacts with the backend
   │  ├─ modules   # redux reducers, constants and action creators
   │  ├─ sagas     # redux sagas
   │  └─ store.js  # where the redux store is created and configured
   ├─ shared       # utilities
   ├─ config.js
   ├─ history.js
   ├─ index.js     # where the react app is mounted
   ├─ routes.js    # react-router configuration
   └─ yarn.lock
```
