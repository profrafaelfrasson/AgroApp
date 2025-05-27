import React from 'react';
import ReactInputMask from 'react-input-mask';
import { Flex, Input, FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react";

export default function InputPadrao({
    label, required = false, value, change, placeholder, disabled = false, mask
}) {
    
    const isInvalid = required && value === '';

    return (
        <Flex direction='column' gap='1'>
            <FormControl isRequired={required} isInvalid={isInvalid}>
                <FormLabel fontWeight='bold'>{label}:</FormLabel>
                <Input as={mask != null ? ReactInputMask : null} 
                    mask={mask}
                    value={value}
                    onChange={change} 
                    isDisabled={disabled}
                    placeholder={placeholder} 
                    border='1px' 
                    _disabled={{borderColor: 'gray.300'}}/>
                <FormErrorMessage>{label} é obrigatório</FormErrorMessage>
            </FormControl>
        </Flex>
    );
}