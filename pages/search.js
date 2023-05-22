import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import {Flex,Box,Text,Icon} from '@chakra-ui/react';
import {BsFilter } from 'react-icons/bs'; 
import SearchFilter from '../components/SearchFilter';
import Main_search from "../components/MainSearch";
import Property from '../components/Property';
import HorizonalCard from "../components/HorizonalCard";
import noresult from '../assets/images/noresult.svg';
import {baseUrl,fetchApi} from '../utils/fetchApi';
import Autocomplete from '../components/AutoComplete';
import Map, { GeolocateControl } from "react-map-gl";
import {GoKebabVertical } from 'react-icons/go';
import { BsSortDown } from 'react-icons/bs';
import {FaGripHorizontal,FaList} from 'react-icons/fa';

import "mapbox-gl/dist/mapbox-gl.css"

const Search = ({properties}) => {
    
    const [searchFilter,setSearchFilter] = useState(false);
    const router = useRouter();
    const [toggleVerticalCard,setToggleVerticalCard] = useState('true');
    const listingsH = [properties.map((property) =>
               <HorizonalCard   property={property} key={property.id} /> 
                   )];
    const listingsV = [properties.map((property) =>
            <Property property={property} key={property.id} />
                   )]
  return (
    <Box>
        <Flex
        cursor="pointer" 
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p={{"base":"10","md":"2"}}
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilter(!searchFilter)}
        >
        <Text> Search properties by filter </Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
        </Flex>
        {searchFilter && <SearchFilter/>}
        <Flex justifyContent={'space-between'} fontSize={['md','xl','xl','2xl']} p="4" fontWeight="bold">
        <Flex color={'#006169'} flexGrow={1} justifyContent={'right'} >
        <Icon 
            cursor={ 'pointer'} 
            color={!toggleVerticalCard?'#006169':'#ddd'}
             onClick={()=>{setToggleVerticalCard(!toggleVerticalCard)}} 
              ms={2} me={2}
             as={FaGripHorizontal}
              />
              <Icon
                cursor={'pointer'} 
            color={toggleVerticalCard?'#006169':'#ddd'}
             onClick={()=>{setToggleVerticalCard(!toggleVerticalCard)}} 
              ms={2} me={2}
                 as={FaList}/>
               <Icon as={BsSortDown}/> 
             

        </Flex>
        <Text>
            properties {router.query.minPrice}
        </Text>
        </Flex>
        <Flex flexDirection={['column']}  flexWrap="wrap" justifyContent="center" alignItems="center" >
            {!toggleVerticalCard?listingsV:listingsH}
          </Flex>
        {properties.length === 0 && (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
            <Image width="auto" height="auto" alt="no result" src={noresult}/>
            <Text fontSize="2xl" marginTop="3">No Results founds</Text>
            </Flex>
        )}
    </Box>
  )
}

export default Search


export async function getServerSideProps({query}) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const bathsMin = query.bathsMin || '0';
    const roomsMin = query.roomsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4'; 
    const lang = query.lang || 'ar';
    // const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&hitsPerPage=6&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&bathsMin=${bathsMin}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}&categoryExternalID=${categoryExternalID}&lang=${lang}`);
        const data = await fetchApi(`http://127.0.0.1:8000/api/list-properties/`)
                    return {
                        props:{
                            properties:data?.results
                        }
                    }
}