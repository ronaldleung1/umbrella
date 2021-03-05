import * as React from "react";
import { Box, Image, Text, SimpleGrid } from "@chakra-ui/react";
import Draggable from 'react-draggable';

export default class StickyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //stickies: [{message: "yellow", color: "yellow"}, {message: "purple", color: "purple"}],
      //colors: ["purple", "yellow", "orange", "red", "blue"]
    }
  }
  render() {
    console.log(this.props.stickies);
    return (
      <>
        {this.props.stickies.length !== 0 ? 
          (<SimpleGrid columns={4} spacing={2}>
            {this.props.stickies.map((sticky, index) => {
              //const randColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
              return (sticky.isImage ? (
                  <Draggable key={index}><Box className={"note "+sticky.color} width="120px" height="120px">
                    <Image src={sticky.value}/>
                    <Text>{sticky.value}</Text>
                  </Box></Draggable>
                ) : (
                  <Draggable key={index}><Box className={"note "+sticky.color} d="flex" overflowY="scroll" justifyContent="center" wordBreak="break-word" p={4} width="120px" height="120px">
                    <Text alignSelf="center">{sticky.value}</Text>
                  </Box></Draggable>
                )
              );
            })}
            </SimpleGrid>
          ) : ( 
          <Text>Start adding sticky notes by clicking the button below!</Text>
          )
        }
      </>
    );
  }
}