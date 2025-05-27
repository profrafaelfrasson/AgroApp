import { Flex, FormControl, FormLabel, Select, FormErrorMessage } from "@chakra-ui/react";

export default function SelectList ({
    label, value, change, disabled = false, placeholder = 'Selecione', valores, required
}) {

    const isInvalid = required && value === '';

    return (
        <Flex direction='column' gap='1'>
            <FormControl isRequired={required} isInvalid={isInvalid}>
                <FormLabel fontWeight='bold'>{label}:</FormLabel>
                <Select placeholder={placeholder} 
                        disabled={disabled}
                        value={value}
                        onChange={change}
                        border='1px' 
                    _disabled={{borderColor: 'gray.300'}}>
                    {valores.map((item) => (
                        <option key={item.valor} value={item.valor}>{item.label}</option>
                    ))}
                </Select>
                <FormErrorMessage>{label} é obrigatório</FormErrorMessage>
            </FormControl>
        </Flex>
    );
}