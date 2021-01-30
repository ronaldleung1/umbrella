import * as React from "react";
import { Box, Image, Flex, Badge, Text, SimpleGrid } from "@chakra-ui/react";

export default class StickyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickies: 20
    }
  }
  render() {
    return (
      <>
      <SimpleGrid columns={4} spacing={2}>
        {Array(this.state.stickies).fill(<Box className="note purple" width="80px" height="80px"></Box>)}
        <Box className="note purple" width="80px" height="80px"></Box>
        <Box className="note yellow" width="80px" height="80px"></Box>
        <Box className="note orange" width="80px" height="80px"></Box>
        <Box className="note blue" width="80px" height="80px"></Box>
        <Box className="note red" width="80px" height="80px"></Box>
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