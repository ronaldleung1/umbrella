<p align="center">
  <a href="https://github.com/googol88/umbrella/">
    <img src="react-ui/public/logo2.png" alt="Umbrella Logo" width="160" height="160">
  </a>

  <h3 align="center">Umbrella</h2>

  <p align="center">
    Post-It Note Murals for Social Activists
  </p>
</p>

## About the Project
Umbrella is a platform for social activists to spread messages in a Post-It note style virtual Lennon Wall, inspired by the anti-government protests in Hong Kong. 

### The Stack
- React app with Chakra UI
- Node.js/Express server
- Firebase Realtime Database

> 🚨 At the moment, there is no functional back-end due to issues integrating with Firebase DB. Use the `static` branch to run without the Node server.
## Setup

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```

## Contributing
Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Distributed under the MIT License. See `LICENSE` for more information.