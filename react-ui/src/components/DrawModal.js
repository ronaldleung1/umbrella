import React, { useState, useRef } from "react";
import { Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Box, Button, Stack, Image, Flex, Badge, Text, SimpleGrid 
} from "@chakra-ui/react";
import CanvasDraw from "react-canvas-draw";

export default function DrawModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [brushRadius, setBrushRadius]  = useState(10);
  const [drawing, setDrawing] = useState();
  let saveableCanvas = useRef(null);

  function handleSubmit(e) {
    setDrawing(saveableCanvas.getSaveData());
    props.handleSubmit(saveableCanvas.canvasContainer.children[1].toDataURL());
    onClose();
    toast({
      title: "Drawing submitted!",
      description: "You've shared your voice - go see your sticky note on display!",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <Button ml={2} onClick={onOpen}>Draw a Note</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Drawing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>  
            <Stack direction="row" spacing={4} align="center">
              <button
                onClick={() => {
                  saveableCanvas.clear();
                }}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  saveableCanvas.undo();
                }}
              >
                Undo
              </button>
              <div>
                <label>Brush-Radius:</label>
                <input
                  type="number"
                  value={brushRadius}
                  onChange={e =>
                    setBrushRadius(parseInt(e.target.value, 10))
                  }
                />
              </div>
            </Stack>
            <CanvasDraw 
              ref={canvasDraw => (saveableCanvas = canvasDraw)}
              hideInterface
              brushColor="#000"
              brushRadius="5"
              lazyRadius="3" />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}>
              Submit
            </Button>
            {/*onClick={() => {
                localStorage.setItem(
                  "savedDrawing",
                  saveableCanvas.getSaveData()
                );
                alert(saveableCanvas.getSaveData());
              }} */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}