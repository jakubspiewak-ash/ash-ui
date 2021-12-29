import { Icon as ChakraIcon, Text, VStack } from '@chakra-ui/react';
import { BiBuildings, BsPersonCircle } from 'react-icons/all';

import { HasExpense } from '../../types';
import { InfoBox } from '../InfoBox';

export const IsPrivate = (props: HasExpense) => {
    const { expense } = props;
    const { isPrivate } = expense;

    const Icon = isPrivate ? BsPersonCircle : BiBuildings;
    const Label = isPrivate ? 'Private' : 'Company';

    return (
        <InfoBox>
            <VStack spacing={8}>
                <Text fontSize={'3xl'}>{Label}</Text>
                <ChakraIcon
                  as={Icon}
                  h={16}
                  w={16}
                />
            </VStack>
        </InfoBox>
    );
};