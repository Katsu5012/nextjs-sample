import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'

type ModalBaseProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  onCancelClick?: () => void
  onOkClick?: () => void
  onWillOpen?: () => void
  onWillClose?: () => void
  title?: string
  isLoading?: boolean
  isCancelHide?: boolean
  cancelText?: string
  okText?: string
}

const ModalBase = memo<ModalBaseProps>((props) => {
  const [localOpen, setLocalOpen] = useState(false)
  const {
    isOpen,
    onClose,
    children,
    onCancelClick = onClose,
    onOkClick = onClose,
    /** モーダルを開く時の処理 */
    onWillOpen = () => {},
    /** モーダルを閉じる時の処理 */
    onWillClose = () => {},
    title,
    isLoading = false,
    isCancelHide = false,
    cancelText = 'Cancel',
    okText = 'OK',
  } = props

  const loadingOkText = okText !== 'OK' ? `${okText}中` : ''

  useEffect(() => {
    if (isOpen && onWillOpen) {
      console.log('willOpen')
      onWillOpen()
      setLocalOpen(true)
      return
    }

    if (!isOpen && localOpen) {
      console.log('close?')
      onWillClose()
      setLocalOpen(false)
      return
    }
  }, [isOpen, localOpen, onWillOpen, onWillClose])

  console.log('modal')

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          {/* title */}
          {title !== undefined && <ModalHeader>{title}</ModalHeader>}

          {/* body */}
          <ModalBody>{children}</ModalBody>

          {/* footer */}
          <ModalFooter>
            <ButtonGroup>
              {!isCancelHide && (
                <Button
                  onClick={onCancelClick}
                  isLoading={isLoading}
                  colorScheme="red"
                  variant="outline"
                >
                  {cancelText}
                </Button>
              )}

              <Button
                onClick={onOkClick}
                isLoading={isLoading}
                loadingText={loadingOkText}
                colorScheme="blue"
              >
                {okText}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

ModalBase.displayName = 'ModalBase'

export default ModalBase
