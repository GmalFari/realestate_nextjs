import Link from "next/link";
import Image from 'next/image';
import { Img } from "@chakra-ui/react";
import { FaPhone,FaEnvelope,FaWhatsapp,FaMapMarker,faGridVer} from "react-icons/fa";
import {Box,Grid,Flex,Text,Avator, Spacer} from '@chakra-ui/react';
import millify from 'millify';
import {BsBoxArrowInDown, BsGridFill,BsFillGeoAltFill} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go'
import DefualtImage from "../assets/images/webimg2.webp"
import { Avatar } from "@chakra-ui/react";
import {FaBed , FaBath} from 'react-icons/fa';
import { Card,CardBody,CardFooter,Stack,Heading,Button } from "@chakra-ui/react";
import MainBtn from "./MainBtn";
import Horizontal from './Horizontal';
const HorizonalCard = (
    {property:{coverPhoto,property_title
        ,property_price,rentFrequency,
        location,rooms,
        baths,area,agency,isVerified,externalID,geography}}) => {
    //   const loc11 = location[3]['name_l1']
    //   const loc1 = loc11.replace('Dubai','Sanaa');
    //   const loc2 = location[1]['name_l1'].replace('Dubai','Sanaa');
    //   const loc3 = location[2]['name_l1'].replace('Dubai','Sanaa');
      return (
      <Flex w={['95%','95%','700px','800px']} 
            height={[170,200]} 
            border='1px solid #ddd'  
            flexWrap="nowrap" 
            flexDirection={["row"]}
            overflow="hidden" m="2" 
            paddingTop="0" 
            justifyContent="flex-start" 
            cursor="pointer">
            <Link  href={`/property/${externalID}`} passHref>
            <Box  height={'100%'} me="4" >
                <Img src={coverPhoto ? coverPhoto:DefualtImage} 
                borderRadius={2}
                width={[160,170,250]} 
                height={[170,200]}
                minH={[170,200]}
                 objectFit={'cover'}
                  alt="default house" />
            </Box>
            </Link>
            <Box position={'relative'} w={[200,250]} flexGrow={1} >
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between" >
                    <Flex alignItems="center">
                        <Box   paddingRight="0" color="green.400">{isVerified &&  <GoVerified />}</Box>
                        <Text fontWeight="bold" fontSize="md"> ريال يمني  {millify(property_price)}{rentFrequency && `/${rentFrequency}`}</Text>
                    </Flex>
                </Flex>
                
                <Text isTruncated fontSize={["sm","md"]} >
                     {property_title}
                </Text>
                <Flex isTruncated flexWrap='noWrap' display={'flex'}  pt={[1,2]} fontSize={['11px','sm','md']} color={'#006169'} >
                <BsFillGeoAltFill />
                {/* {`${loc1}`},
                {`${loc3}`},
                {`${loc2}`} */}
                </Flex>
<Box display={"flex"} flexWrap='noWrap'   fontSize={['sm','md']} alignItems="center" p="1" justifyContent="right" w="100%" color="#000">
                <Box display={"flex"} alignItems="center" ml={2}>  {rooms} <FaBed  /> </Box> 
                <Box display={"flex"} alignItems="center" ml={2}>  {baths} <FaBath /> </Box>
                <Box display={"flex"} alignItems="center" ml={2}>{millify(area)} sqft <BsGridFill/></Box>
                </Box>
                <Grid width={'100%'} position={'absolute'} bottom={1}   templateColumns='repeat(3, 1fr)' gap={1} >
                <MainBtn  icon={<FaWhatsapp fontSize={'sm'} content="whatsapp" fontWeight={'bold'}  color='white' />} bgcolor={'#28b16d'} color={'#fff'}  />
                <MainBtn icon={<FaEnvelope fontSize={'sm'} fontWeight={'bold'} color='#28b16d' />} bgcolor={'#006169'} color={'#fff'} />
                <MainBtn icon={<FaPhone fontSize={'sm'} fontWeight={'bold'} color='#28b16d' />} bgcolor={'#006169'} color={'#fff'}  />
                {/* <Link href={`/agencies`}>
                    <Avatar ms="70%"   size="sm" src={agency?.logo?.url} />
                    </Link> */}
            </Grid>
            </Box>
        </Flex>
)
              }
export default HorizonalCard;
