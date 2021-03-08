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
  Button,
  Text,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import CanvasDraw from "react-canvas-draw";

export default function DrawModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [brushRadius, setBrushRadius]  = useState(5);
  const [, setDrawing] = useState();
  let saveableCanvas = useRef(null);

  function handleSubmit() {
    setDrawing(saveableCanvas.getSaveData());
    props.handleSubmit(saveableCanvas.canvasContainer.children[1].toDataURL());
    onClose();
    toast({
      title: "Drawing submitted!",
      position: "top-right",
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
            <Stack direction="row" align="center" mb={2}>
              <Button
                size="xs"
                mr={2}
                onClick={() => {saveableCanvas.clear()}}
              >
                Clear
              </Button>
              <Button
                size="xs"
                mr={2}
                onClick={() => {saveableCanvas.undo()}}
              >
                Undo
              </Button>
              <Text fontSize="xs">Brush Size:</Text>
              <NumberInput 
                defaultValue={2}
                min={1}
                max={10}
                allowMouseWheel
                value={brushRadius}
                onChange={value => setBrushRadius(parseInt(value, 10))}
                size="xs"
                maxW={16}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {/*<Input
                type="number"
                value={brushRadius}
                onChange={e => setBrushRadius(parseInt(e.target.value, 10))}
                size="xs"
              />*/}
            </Stack>
            <CanvasDraw 
              ref={canvasDraw => (saveableCanvas = canvasDraw)}
              hideInterface
              brushColor="#000"
              brushRadius={brushRadius}
              lazyRadius={3} />
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}