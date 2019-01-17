# HomeAutomation
Home Automation System in Node.js using Express as a framework.

## Node to Server Communication Explained
> A 'node' is a small controller, sensor and/or monitor. They are designed to act as the actuators of the system as they carry out the instructions.
> The 'server' is the master controller of all of the nodes. It tracks the status of multiple nodes, delivers messages to nodes, holds the configuration information, handles node authorisation and everything else.

### Node Authorisation
There is a *relatively* complicated setup regarding authorisation of new nodes on the network.
1. Once the node has booted, it looks for a local configuration file specific to that node. If it does not find that file, it goes through a standard setup. In these steps, we are assuming that the node has **not** found a configuration file.
2. As the node hasn't found an existing configuration, it generates a token and sends that to the server as an authorisation request. The server stores that request and it shows on the dashboard.
3. A user is then required to either authorise or deny the request for the node to join the network.
4. If denied, the server sends a response to the node denying access to the network. If authorised, that node's token joins the authorised nodes list along with its name, IP address and other information. The server then sends a response to the node authorising the access request.
5. The node then sends a request to the server to open a WebSocket connection, along with its newly generated access token. The server authorises the access token and assigns a websocket connection to that node. That node is now setup and two-way asynchronous communication can take place between the server and node.

#### From a User Perspective
1. Plug in the Node.
2. Look on the dashboard for the newly joined Node, accept it and give it a name.
3. That's it!

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