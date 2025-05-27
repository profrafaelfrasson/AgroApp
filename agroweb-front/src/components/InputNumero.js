import { Flex, FormControl, FormLabel, InputGroup, InputLeftAddon, NumberInput, NumberInputField, FormErrorMessage } from "@chakra-ui/react";

export default function InputNumero({
    label, value, change, placeholder, disabled = false, precision = 0, addon, required
}) {
    
    const borderRadius = addon != null ? '0' : '6';
    const isInvalid = required && value === '';

    return (
        <Flex direction='column' gap='1'>
            <FormControl isRequired={required} isInvalid={isInvalid}>
                <FormLabel fontWeight='bold'>{label}:</FormLabel>
                <NumberInput min={0} 
                             precision={precision} 
                             placeholder={placeholder} 
                             disabled={disabled} value={value} >
                    <InputGroup>
                        {addon && <InputLeftAddon children={addon} border='1px' borderColor={isInvalid && '#E53E3E'} boxShadow={isInvalid && '0 0 0 1px #E53E3E'} />  }
                        <NumberInputField onChange={change}
                                        border='1px'
                                        borderTopLeftRadius={borderRadius} 
                                        borderBottomLeftRadius={borderRadius} 
                                        _disabled={{borderColor: 'gray.300'}}/>
                    </InputGroup>
                    <FormErrorMessage>{label} é obrigatório</FormErrorMessage>
                </NumberInput>
            </FormControl>
        </Flex>
    );
}