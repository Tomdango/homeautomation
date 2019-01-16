# HomeAutomation
Home Automation System in Node.js using Express as a framework.

## Installing and Running
### Automation Controller
#### A note on Websockets
*note* - You need to ensure that you have your Websocket endpoints properly enabled and setup.
This includes if you are planning on running the Automation Controller behind a reverse proxy.
If the Websockets don't properly work, it could mean that the nodes aren't able to "phone home" and establish a connection with the controller.
#### Installation
1. Pull the repository
2. Run `npm install` or `yarn install`, whichever is your preferred package manager of choice.
3. Edit the values in `.env.example` with the correct details and rename it as `.env`. These are your environment variables.
4. Run the application! If you're unsure of how to run the application, try `node bin\www`.

#### Requirements
- Node v11.5.0 - *other versions of Node may work, but they may not be supported*.
- At **least** an internet-connected potato.
- A whole bag of hope.

&copy; Benji Morton & Thomas Judd-Cooper 2019
