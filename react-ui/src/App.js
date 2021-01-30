import React, { useCallback, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Image,
  Input,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import './App.css';
import StickyGrid from './components/StickyGrid';
import DrawModal from './components/DrawModal';
import './api.js';
import CanvasDraw from "react-canvas-draw";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isFetching: null,
      url: '/api',
      value: '',
      stickies: [{isImage: false, message: "yellow", color: "yellow"}, {isImage: true, message: "data:image/png;base64,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IEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAQEBskARDYEAAQI9BARID3V9EiBAYAEBAbJAEQ2BAAECPQQESA91fRIgQGABAQGyQBENgQABAj0EBEgPdX0SIEBgAYH/Byjpsq9rFP5MAAAAAElFTkSuQmCC", color: "purple"}],
      colors: ["purple", "yellow", "orange", "red", "blue"],
      drawingUrl: ""
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSticky = this.addSticky.bind(this);
  }
  /*const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');*/
  
  fetchData() {
    fetch(this.state.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({message: json.message, fetching: false}); /*setMessage(json.message)*/
        /*this.setIsFetching(false);*/
      }).catch(e => {
        this.setState({message: `API call failed: ${e}`, fetching: false});
        /*setMessage(`API call failed: ${e}`);
        setIsFetching(false);*/
      })
  };

  /*useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);*/

  componentDidMount() {
    this.setState({isFetching: true});
    this.fetchData();
    // Will. put jquery stuff there
    // https://reactjs.org/docs/integrating-with-other-libraries.html
  }

  addSticky = (value, isImage) => {
    this.setState(state => {
      const randColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
      const stickies = state.stickies.concat({isImage: isImage, message: value, color: randColor});
      console.log(stickies);
      return {stickies};
    });
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit(e) {
    this.addSticky(this.state.value, false);
    this.setState({value: ''});
    /*this.setState((message) => { 
      let stickyMessage = e.target.value;
      alert(stickyMessage);
      return {stickyMessage}
    });*/
    //alert(this.state.stickyMessage);
    e.preventDefault();
  }

  updateDrawing(drawing) {
    console.log(drawing);
    this.setState({drawingUrl: drawing});
    this.addSticky(drawing, true);
  }
  
  render() {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <StickyGrid stickies={this.state.stickies} /> {/*handleSubmit={drawing => this.updateDrawing(drawing)}*/}
              <form onSubmit={this.handleSubmit}>
                <Input placeholder="Enter message" value={this.state.value} onChange={this.handleChange}></Input>
              </form>
              <DrawModal
                handleSubmit={(drawing) => this.updateDrawing(drawing)}
              />
              <Box boxSize="sm">
                <Image src={this.state.drawingUrl}/>
              </Box>
              <CanvasDraw
                disabled
                hideGrid
                ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                loadTimeOffset={0}
                saveData={localStorage.getItem("savedDrawing")}/>
              { process.env.NODE_ENV === 'production' ?
                  <Text>
                    This is a production build from create-react-app.
                  </Text>
                : <Text>
                    Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
                  </Text>
              }
              <Text>{'« '}
              {this.state.isFetching
                ? 'Fetching message from API'
                : this.state.message}
              {' »'}</Text>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  }
}

export default App;
/*
import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { process.env.NODE_ENV === 'production' ?
            <p>
              This is a production build from create-react-app.
            </p>
          : <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
        }
        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
        <p><a
          className="App-link"
          href="https://github.com/mars/heroku-cra-node"
        >
          React + Node deployment on Heroku
        </a></p>
        <p><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></p>
      </header>
    </div>
  );

}

export default App;
*/