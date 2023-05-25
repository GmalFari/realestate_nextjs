import axios from "axios";
import {Flex,Grid,Select ,Box,Text,Input,Avatar,Spinner,Icon,Button} from '@chakra-ui/react';
import {FaBed,FaBath,FaImages,FaWhatsapp,FaEnvelope,FaPhone,FaShare,FaDownload,FaRegHeart} from 'react-icons/fa';
import { Img } from '@chakra-ui/react';
import {BsGridFill} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';
import millify from 'millify';
import ImageScrollbar from '../../components/ImageScrollbar';
import Link from 'next/link';
import {useState, createContext } from 'react';
import {baseUrl,fetchApi} from '../../utils/fetchApi';
import { BasicUsage } from '../../components/BasicUsage';
import MainBtn from '../../components/MainBtn';

import { useRouter } from "next/router";
import Multisteps from "../../components/MultiSteps";
const desc = 'مساحة الشقة 135 مترا مربعا، وهي مكونة من غرفتين نوم وسفرة وصالة استقبال وطرقة وحمامين ومطبخ وبلكونتين، وما يخصها من حصة شائعة فى الجراج والأجزاء المشتركة .'

const PropertyDetails = ({propertyDetails:
    {id,coverPhoto,price="500000",rentFrequency,rooms,purpose
        ,title_l1,property_title,
        description_l1=desc,baths,area,agency,
    isVerified,type,photos,amenities,
    furnishingStatus,geography,
    location}})=>{
    console.log(location['coordinates'])

    const [toggleMap,setToggleMap ] = useState(true)

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", "English is hard, but detectably so");

    const router = useRouter();
    
    return(
      <>
        <Box maxWidth="1000px" marginLeft={['auto']} marginRight={['auto']} p="4">
                <Flex>
                    <BasicUsage coverPhoto={coverPhoto} photos={photos}  geography={location['coordinates'] } />
                  </Flex>
                  <Box position={'relative'}>
                  <Flex bg='rgba(255,255,255,0.8)' position={'absolute'} bottom={0} mb={2} justifyContent={'left'} templateColumns='repeat(3, 1fr)' gap={2} >
                        <MainBtn icon={<FaShare fontWeight={'bold'} color='#006169' />}  color={'#fff'} />
                        <MainBtn icon={<FaRegHeart fontWeight={'bold'} color='#006169' />} color={'#fff'}  />
                        <MainBtn icon={<FaDownload fontWeight={'bold'} color='#006169' />} color={'#fff'}  />
                    </Flex>
                    {coverPhoto && <Img src={coverPhoto} width={"100%"} height={"80%"} />}
                  </Box>
                  
                <Box w="full" p="6">
                <Box w='full'>
                <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
                  <Flex alignItems='center'>
                    <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                    <Text fontWeight='bold' fontSize='lg'>ريال يمني  {price}{rentFrequency && `/${rentFrequency}`}</Text>
                  </Flex>
                  <Link href={`/agencies`}>
                    <Avatar size='sm' src={agency?.logo?.url}></Avatar>
                  </Link>
                </Flex>
                <Flex  w={250} alignItems='center' p='1' justifyContent='space-between'  color='#006169' >
                  {rooms}
                  <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />  
                  {/* {toggleMap ? 
                  <Button onClick={()=>{setToggleMap(!toggleMap)}} ></Button> 
                  : <MyMap geoDetail={geography} />} */}
                
                </Flex>
              </Box>
                <Box marginTop="2">
                    <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                        {property_title.replace('صنعاء','دبي')}
                    </Text>
                    <Box p={0} bg='#fff' position={['fixed','fixed','fixed','relative']} left={0} bottom={'0'} width={'100%'}>
                    <Grid  templateColumns='repeat(3, 1fr)' gap={2} >
                        <MainBtn icon={<FaWhatsapp fontWeight={'bold'} color='#006169' />} bgcolor={'#28b16d'} color={'#fff'} content={'وتس أب'} />
                        <MainBtn icon={<FaEnvelope fontWeight={'bold'} color='#28b16d' />} bgcolor={'#006169'} color={'#fff'} content={'الإيميل'} />
                        <MainBtn icon={<FaPhone fontWeight={'bold'} color='#28b16d' />} bgcolor={'#006169'} color={'#fff'} content={'إتصال'} />
                    </Grid>
                    </Box>
                    <Box lineHeight="2" color="gray.600">
                        {description_l1}
                    </Box>
                </Box>
                    <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                        <Flex justifyContent="space-between" w="400px"  borderBottom="1px" borderColor="gray.100" p="3">
                            <Text> Type</Text>
                            <Text fontWeight="bold" >{type}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" w="400px"  borderBottom="1px" borderColor="gray.100" p="3">
                            <Text> purpose</Text>
                            <Text fontWeight="bold" >{purpose}</Text>
                        </Flex>
                        {furnishingStatus &&(
                            <Flex justifyContent="space-between" w="400px"  borderBottom="1px" borderColor="gray.100" p="3">
                                <Text> furnishingStatus</Text>
                                <Text fontWeight="bold" >{furnishingStatus}</Text>
                            </Flex>
                        )
                        }
                        <Box>
                            {/* {amenities.length && <Text fontSize="2xl" fontWeight="black"  marginTop="5"  >
                                Amenities
                            </Text>} */}
                            {/* <Flex flexWrap="wrap">
                                {amenities.map((item)=>(
                                    item.amenities.map((amenity)=>(
                                        <Text key={amenity.text} 
                                        fontWeight="bold" 
                                        color="blue.400"
                                        fontSize="16"
                                        p="2"
                                        bg="gray.200"
                                        m="1"
                                        borderRadius="5"
                                        >
                                        {amenity.text}
                                        </Text>
                                    ))
                                ))}
                            </Flex> */}
                        </Box>
                  </Flex> 
                    </Box>
        </Box>
        <Box>
        {/* <form onSubmit={GetProperty}> */}
                  <Link passHref href={`/property/propertyEdit/${id}`}>Get property</Link>
                {/* </form> */}
        </Box>
</>
)}


export default PropertyDetails
export async function getServerSideProps({params: {id}}){
    const data = await fetchApi(`http://127.0.0.1:8000/api/list-properties/${id}/`)
    return {
        props : {
            propertyDetails:data
        }
    }
}

