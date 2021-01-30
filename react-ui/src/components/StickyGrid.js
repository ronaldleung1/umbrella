import * as React from "react";
import { Box, Image, Flex, Badge, Text, SimpleGrid } from "@chakra-ui/react";
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
    return (
      <>
      <SimpleGrid columns={4} spacing={2}>
        {this.props.stickies.length !== 0 ? 
          (this.props.stickies.map((sticky, index) => {
          //const randColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
          return (sticky.isImage ? 
            (<Draggable><Box className={"note "+sticky.color} key={index} width="120px" height="120px">
              <Image src={sticky.message}/>
            </Box></Draggable>)
            :
            <Draggable><Box className={"note "+sticky.color} key={index} p={4} width="120px" height="120px">{sticky.message}</Box></Draggable>
          );
        }))
        : 
          <Text>Start adding sticky notes by clicking the button below!</Text>
        }
        {/*Array(this.state.stickies).fill(<Box className="note purple" width="80px" height="80px"></Box>)
        <Box className="note purple" width="160px" height="80px"></Box>
        <Box className="note yellow" width="80px" height="80px"></Box>
        <Box className="note orange" width="80px" height="80px"></Box>
        <Box className="note blue" width="80px" height="80px"></Box>
        <Box className="note red" width="80px" height="80px"></Box>*/}
      </SimpleGrid>
      {/*<Box p="5" maxW="320px" borderWidth="1px">
        <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
        <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          Modern, Chic Penthouse with Mountain, City & Sea Views
        </Text>
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>*/}
      </>
    );
  }
}