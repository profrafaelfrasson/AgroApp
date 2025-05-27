import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export default function DatePicker({
    label, required, value, change, placeholder, disabled = false
}) {

    var estiloBotao = {
        inputProps: {
            border: '1px',  _disabled:{borderColor: 'gray.300'}
        },
    };

    var configuracao = {
        dateFormat: 'dd/MM/yyyy',
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    }

    return (
        <Flex direction='column' gap='1'>
            <FormControl isRequired={required}>
                <FormLabel fontWeight='bold'>{label}:</FormLabel>
                <SingleDatepicker date={value}  
                                  onDateChange={change} 
                                  placeholder={placeholder} 
                                  disabled={disabled} 
                                  configs={configuracao}
                                  propsConfigs={estiloBotao} />
            </FormControl>
        </Flex>
    );
}