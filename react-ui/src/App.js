import React, {  } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Input,
  Image,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';
import StickyGrid from './components/StickyGrid';
import DrawModal from './components/DrawModal';
import $ from 'jquery';
import firebase from './firebase.js';


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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSticky = this.addSticky.bind(this);
    this.sendPost = this.sendPost.bind(this);
  }
  
  fetchData() {
    firebase.database().ref("/").on("value", value=>{
      this.setState({stickies: Object.values(value.val()), message: '200 OK', isFetching: false}, () => console.log(this.state.stickies));
    });
  };

  componentDidMount() {
    this.setState({isFetching: true});
    this.fetchData();
  }

  addSticky = (value, isImage) => {
    this.setState(state => {
      const randColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
      const stickies = state.stickies.concat({isImage: isImage, value: value, color: randColor});
      /*value, color, x, y, isImage, imageValue*/
      this.sendPost(isImage, value, randColor, 0, 0);
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
    e.preventDefault();
  }

  updateDrawing(drawing) {
    console.log(drawing);
    this.setState({drawingUrl: drawing});
    this.addSticky(drawing, true);
  }
  
  sendPost(isImage, value, color, x, y){
    const postRef = firebase.database().ref("/");
    const post = {
      isImage,
      value,
      color,
      x,
      y,
    }
    postRef.push(post);
  }
  
  render() {
    return (
      <ChakraProvider theme={theme}>
          <Box position="fixed">
            <Image
              boxSize="100px"
              objectFit="cover"
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Umbrella Logo"
            />
          </Box>
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher position="fixed" top={0} right={0} m={3} /> {/*position="fixed" top={0} right={0} m={3}*/}
            <VStack spacing={8} justifyContent="center">
              <StickyGrid stickies={this.state.stickies} />
              {/*<Box position="absolute" top="10">
                <Text>{'« '}
                  {this.state.isFetching
                    ? 'Fetching message from API'
                    : this.state.message}
                {' »'}</Text>
              </Box>*/}
              <Box position="fixed" bottom="10">
                <form onSubmit={this.handleSubmit} style={{display: 'inline-block'}}>
                  <Input placeholder="Enter message" value={this.state.value} onChange={this.handleChange}></Input>
                </form>
                <DrawModal
                  handleSubmit={(drawing) => this.updateDrawing(drawing)}
                />
              </Box>
            </VStack>
          </Grid>
      </ChakraProvider>
    );
  }
}

export default App;