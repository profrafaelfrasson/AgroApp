import { Box, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

export default function ModalPadrao({
    cabecalho = "",
    children = <Text>Não implementado</Text>,
    aberto = true,
    acaoFechar,
    width = '80vw'
}) {

    return (
        <>
            <Modal isOpen={aberto} onClose={acaoFechar} size='xl' isCentered>
                <ModalOverlay />
                <ModalContent minWidth={width}>
                    <ModalHeader>{cabecalho}</ModalHeader>
                    <ModalCloseButton />

                    <Box padding='0 24px 20px 24px'>
                        {children}
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
}