import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import image from "../assets/images/img1.jpg";
import {Divider,Avatar,CardBody,Flex,ButtonGroup,Button,Text, Card,Stack, CardFooter,Heading, Box } from '@chakra-ui/react'
import millify from 'millify';
import {FaBed , FaBath,FaGripHorizontal} from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified,GoKebabVertical } from 'react-icons/go';
const MainCard = (
  {property:{id,coverPhoto,price,rentFrequency,rooms,property_title,baths,area
    ,agency,isVerified,externalID,createdAt}}  
  ) => {
    const date = new Date(createdAt);
    const currentDate = new Date()
    const created = currentDate.getHours() - date.getHours();
    const checkCreatedFunc = created =>{
      let checkCreated = '';
      if(created == 1) {
        return checkCreated = 'ساعة واحده'
      } else if (created == 2){
       return  checkCreated='ساعتين';
      } else if (created <= 10) {
       return  checkCreated = `${created} ساعات`
      }
      return  checkCreated = `${created} ساعة`
      
    }
  return (
    <Link href={`/property/${id}`} passHref>
     <Card minW="200px" maxW='sm' maxH="300px" >
      <CardBody position="relative">
      <Image src={coverPhoto ? coverPhoto:image} width="400" height="200" alt="default house" />
      <Box   
        position="absolute"
         top="25px"
         left="25px"
         background="#187875b0" 
         color="white" 
         fontWeight="bold" width="fit-content"
         borderRadius="5px" padding="0 3px"
         fontSize="14px"
         >
       <small >جديد-منذ {checkCreatedFunc(created)} </small>
   </Box>
     <Stack spacing='2'>
       <Box >
        <Flex paddingTop="0" alignItems="center" justifyContent="space-between" >
            <Flex alignItems="center">
                <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                <Text fontWeight="bold" fontSize="sm"> AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
            
        </Flex>
       <Heading size='sm'>{property_title.length < 30 ?property_title:`${property_title.substring(0,30)}...`}</Heading>
                <Flex alignItems="center" p="1" justifyContent="space-between" w="250" color="blue.400">
                    {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Box>
                <Text fontSize="md"  >
                    {property_title.length > 30 ? `${property_title.substring(0,25)}...`:property_title}
                </Text>
                </Box>
            </Box>
       </Stack>
   </CardBody>
   <Divider />
 
 </Card>
 
    </Link>
  )
}

export default MainCard
