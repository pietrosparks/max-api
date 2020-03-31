# Introduction

This is a NodeJS Project for interfacing with the [StarWars API](https://swapi.co). 

- [Installation Guide](#installation-guide) - How to get started with the app

# <a name='installation-guide'>Installation Guide</a>

This project requires the following tools:

- Docker - Uses OS-level virtualization to deliver software in packages called containers.

To get started, install Docker on your local computer if you don't have them already. [here](https://docker.com/)

## Getting Started

**Step 1. Clone the code into a fresh folder**

```
$ git clone https://github.com/pietrosparks/max-api.git
$ cd max-api
```

**Step 2. Run Docker Compose**

Next, we need to run docker compose to create our image specified in `docker-compose.yaml` and run it .

```
$ docker-compose up
```

Open http://localhost:5000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

