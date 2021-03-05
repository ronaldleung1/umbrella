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
        this.setState({stickies: Object.values({...json}), message: '200 OK', isFetching: false}, () => console.log(this.state.stickies));
      }).catch(e => {
        this.setState({message: `API call failed: ${e}`, isFetching: false});
        console.log(this.state.message);
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
      const stickies = state.stickies.concat({isImage: isImage, value: value, color: randColor});
      /*value, color, x, y, isImage, imageValue*/
      this.sendPostIt(isImage, value, randColor, 0, 0);
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
  
  sendPostIt(isImage, value, color, x, y){
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
   $.getJSON("http://localhost:5000/postpostit?isImage=" + isImage + "&value=" + value + "&color=" + color + "&x=" + x + "&y=" + y, ()=>{})
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
              {/*<Box position="absolute" top="10">
                <Text>{'« '}
                  {this.state.isFetching
                    ? 'Fetching message from API'
                    : this.state.message}
                {' »'}</Text>
              </Box>*/}
              <Box position="absolute" bottom="10">
                <form onSubmit={this.handleSubmit} style={{display: 'inline-block'}}>
                  <Input placeholder="Enter message" value={this.state.value} onChange={this.handleChange}></Input>
                </form>
                <DrawModal
                  handleSubmit={(drawing) => this.updateDrawing(drawing)}
                />
              </Box>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  }
}

export default App;