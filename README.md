# LoRHIS - Back-end
The Back-end of the LoRHIS project

## System Demo
[Watch me!](https://youtu.be/hJglYfKcqQY)

## Github Repositories
All of the repositories for the LoRHIS project can be found below:
[LoRHIS - Front-end](https://github.com/Nadekoii/LoRHIS-frontend)

[LoRHIS - Back-end](https://github.com/Nadekoii/LoRHIS-backend)

[LoRHIS - Setup](https://github.com/Nadekoii/LoRHIS-setup)

## Recommended IDE
This IDE was originally used for the development of the project:
[IntelliJ](https://www.jetbrains.com/idea/)

## System Requirement
Node.js is required to run the project:
[Node.js](https://nodejs.org/en/download/package-manager)

## Project's Back-end Manual Setup
### Setup
1. Clone the Back-end repository
2. Navigate to Back-end directory
3. Install the dependencies with:
```sh
npm install                 # Install project's dependencies
npm install axios           # Install the axios package
npm install express         # Install the express package
npm install ws              # Install the websocket package
npm install mqtt            # Install the mqtt package
```

### Compile and Run the Application

```sh
node bin/www
```

## Known bug
### Downlink API
The Downlink API will always reply with Error 400 even with a Success, that's why the code will catch every error and ignore them. Fix the try-catch algorithm when the Downlink API is fixed on the server.
### Uplink API
The Uplink API was abandoned since the MQTT method is much better. If you want to reimplement the Uplink API, do rework the logic so that we actually compare the Uplink time with the current time to send Online-Offline instead of returning Online whenever we get Success response. 
