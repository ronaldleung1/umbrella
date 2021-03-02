import React, {  } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Input,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';
import StickyGrid from './components/StickyGrid';
import $ from 'jquery';
import DrawModal from './components/DrawModal';
//import sendPostIt from './api.js';

let finalArray = [];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isFetching: null,
      data: null,
      url: 'http://localhost:5000/postit.json',
      value: '',
      stickies: [],
      colors: ["purple", "yellow", "orange", "red", "blue"],
      drawingUrl: "",
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSticky = this.addSticky.bind(this);
    this.sendPostIt = this.sendPostIt.bind(this);
    this.fetchPostIt = this.fetchPostIt.bind(this);
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
        this.setState({message: JSON.stringify(json), isFetching: false}, () => console.log(this.state.message));
        console.log(JSON.stringify(json));
      }).catch(e => {
        this.setState({message: `API call failed: ${e}`, isFetching: false});
      })
  };

  componentDidMount() {
    this.setState({isFetching: true});
    this.fetchData();
    console.log("Hello?");
    // Will. put jquery stuff there
    // https://reactjs.org/docs/integrating-with-other-libraries.html
  }

  addSticky = (value, isImage) => {
    this.setState(state => {
      const randColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
      const stickies = state.stickies.concat({isImage: isImage, message: value, color: randColor});
      /*value, color, x, y, isImage, imageValue*/
      this.sendPostIt(isImage ? "" : value, randColor, 0, 0, !isImage, isImage ? value : 0);
      //this.fetchData();
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
  
  sendPostIt(value, color, x, y, isImage, imageValue){
    /*
    var request = new XMLHttpRequest();
    request.open('GET', '/my/url', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
    */
    if(isImage){
      console.log("request sent!");
      $.getJSON("http://localhost:5000/postpostit?value=" + value + "&color=" + color + "&x=" + x + "&y=" +y + "&imageValue="+imageValue, ()=>{})
      /*
      // change parameters to just "sticky"
      $.getJSON("http://localhost:5000/postpostit?isImage=" + sticky.isImage + "&message=" + sticky.message + "&color=" + sticky.color + "&x=" + 0 + "&y=" + 0, ()=>{})
      */
    } else {
      console.log("request sent why!");
      $.getJSON("http://localhost:5000/postpostit?value=" + value + "&color=" + color + "&x=" + x + "&y=" +y, ()=>{})
    }
  }
  fetchPostIt(){
    /*fetch(`http://localhost:5000/postit.json`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json });
      });*/
    /*$.getJSON("http://localhost:5000/postit.json", data=>{
      //not hacky code shut up
      let i = 0;
 
      console.log(data);
      let iterator = 0;
      // let index = 0;
      let addThis = {};
 
      console.log(Object.keys(data));
      console.log(Object.keys(data).length);
      for(var index = 0; index < Object.keys(data).length; index++){
        if(iterator==0){
          addThis.name = data[Object.keys(data)[index]].value;
          console.log(data[Object.keys(data)[index]].value);
          iterator++;
        }else if(iterator==1){
          addThis.color = data[Object.keys(data)[index]].color;
          console.log(addThis.color);
          iterator++;
        }else if(iterator==2){
          addThis.x = data[Object.keys(data)[index]].x;
          console.log(addThis.x);
          iterator++;
        }else if(iterator==3){
          addThis.y = data[Object.keys(data)[index]].y;
          console.log(addThis.y);
          iterator++;
        }else if(iterator==4){
          console.log(addThis);
          
          addThis.imageValue =  data[Object.keys(data)[index]].imageValue;
          finalArray[i] = addThis; addThis = {}; i++;
          iterator = 0;
        }
      }
    })*/
  }
  
  render() {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <StickyGrid stickies={this.state.stickies} /> {/*handleSubmit={drawing => this.updateDrawing(drawing)}*/}
              <Box position="absolute" top="10">
                <Text>{'« '}
                  {this.state.isFetching
                    ? 'Fetching message from API'
                    : this.state.message}
                {' »'}</Text>
              </Box>
              <Box position="absolute" bottom="10">
                <form onSubmit={this.handleSubmit} style={{display: 'inline-block'}}>
                  <Input placeholder="Enter message" value={this.state.value} onChange={this.handleChange}></Input>
                </form>
                <DrawModal
                  handleSubmit={(drawing) => this.updateDrawing(drawing)}
                />
              </Box>
              {/*{ process.env.NODE_ENV === 'production' ?
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
              </Link>*/}
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