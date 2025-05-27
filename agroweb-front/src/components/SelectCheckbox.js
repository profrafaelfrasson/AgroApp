import { Checkbox, Flex } from "@chakra-ui/react";

export default function SelectCheckbox({
    label, value, change, disabled
}) {
    return (
        <>
            <Flex alignSelf="center" height="100%" paddingTop="32px">
                <Checkbox size='lg' value={value} onChange={change} disabled={disabled}>{label}</Checkbox>     
            </Flex>
        </>
    );
}