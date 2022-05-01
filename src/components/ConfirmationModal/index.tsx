import { Button, Modal, Text } from "native-base"
import React from "react"

interface ModalProps {
  visible: boolean
  header: string
  description: string
  onOk: () => void
  onCancel: () => void
  loading?: boolean
}

const ConfirmationModal = ({
  visible,
  header,
  description,
  onOk,
  onCancel,
  loading,
}: ModalProps): JSX.Element => {
  return (
    <Modal isOpen={visible} onClose={onCancel}>
      <Modal.Content w={"80%"}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.CloseButton />
        <Modal.Body>
          <Text>{description}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
              Cancel
            </Button>
            <Button isLoading={loading} onPress={onOk}>
              Yes
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmationModal
