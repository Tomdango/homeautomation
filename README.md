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
2. Look on the dashboard for the newly joined  Node, accept it and give it a name.
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

### Node Setup
1. Obtain a Raspberry Pi, preferably a Raspberry Pi Zero W *(cause they're cheap and have inbuilt WiFi)*
2. Obtain a MicroSD card and reader, you *theoretically* could use a 2GB card, but 4GB+ is recommended.
3. Insert the SD card into your laptop.
4. Download the latest Raspbian Lite image from [here](https://downloads.raspberrypi.org/raspbian_lite_latest).
5. Download and install Etcher from [here](https://www.balena.io/etcher/).
6. Open Etcher and select click "Select Image", then select the downloaded Raspbian Lite image.
7. Under "Select Drive", select your SD card, then click "Flash".
8. When complete, if your SD card is no longer identified by Windows, unplug it, then plug it back in.
9. Windows should identify your SD card as "boot" and "Removable Disk", the latter of which is inaccessible through Windows. Open "boot" and create a blank file named "ssh". To do this, open Notepad and click **File**, **Save As**, set **Save as type** to **All Files**, name it "**ssh**", then save it. Then close notepad.
10. Open Notepad again and enter the following, substituting values where appropriate: ``` country=GB
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
   ssid="NETWORK-NAME"
   psk="NETWORK-PASSWORD"
} ```
11. Save the file as **wpa_supplicant.conf** within the "boot" device, making sure to set the **Save as type** to **All Files**.
12. Right click on the card in the side menu, and click "Eject", then remove the SD card.
13. Insert your SD card into your Pi, then power it on by plugging it in. The initial boot may take a while, so it's a good excuse to go make a cup of tea.
14. Try pinging `raspberrypi.local`. If nothing shows up, then [try installing the Bonjour Service](https://support.apple.com/kb/DL999?locale=en_US).
15. Install [PuTTY](https://www.putty.org/) and open it. In **host name**, enter `pi@raspberrypi.local` and press enter. When it asks for a password, enter `raspberry`. Make sure to run `passwd` when you login to change the password.
16. Run `sudo raspi-config`, go to "Network Options", then "Hostname". Change it to `node-<NODE_NAME>` substituting the node name to whatever you want to call that node. When asked to reboot, select "Yes", then use PuTTY again to login to the Pi, using `pi@node-<NODE_NAME>.local` and the new password you set.
17. Update the Pi by running `sudo apt update && sudo apt upgrade`.
18. On the Pi, enter `wget https://nodejs.org/dist/v11.7.0/node-v11.7.0-linux-armv6l.tar.xz && tar -xf node-v11.7.0-linux-armv6l.tar.xz && sudo cp -r node-v11.7.0-linux-armv6l/* /usr/local/` . You should now have node and npm installed.
19. Install Git `sudo apt install git`
20. Pull in the Node repo by running `git clone https://github.com/Tomdango/homeautomation-singlenode.git homeautomation_node && cd homeautomation_node`
21. Run `npm install && npm start`
22. Done! And in only 21 steps!

#### Requirements
- Node v11.5.0 - *other versions of Node may work, but they may not be supported*.
- At **least** an internet-connected potato.
- A whole bag of hope.

&copy; Benji Morton & Thomas Judd-Cooper 2019