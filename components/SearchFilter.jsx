import React from 'react'
import { useEffect,useState } from 'react';
import {Flex,Select ,Box,Text,Input,Spinner,Icon,Button} from '@chakra-ui/react';
import  { useRouter,Router } from 'next/router';
import {MdCancel} from 'react-icons/md';
import Image from 'next/image';
import {filterData,getFilterValues} from "../utils/filterData";
const SearchFilter = ({setProperties}) => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchProperties = (
    (filtervalues) =>{
      const path = router.pathname;
      const {query } = router;
      const values = getFilterValues(filtervalues);
      values.forEach((item)=>{
        if(item.value && filtervalues?.[item.name]){
          query[item.name] = item.value
        }
      })
      router.push({pathname:path,query})
    }
    
  )
  useEffect(()=>{
    if(searchTerm !== ''){
      const fetchData = async ()=>{
        setLoading(true);
        const data = await fetchApi(`http://127.0.0.1:8000/api/list-properties/`)
        setLoading(data?.results);
        setLoading(false);
        setProperties(data?.results);
        fetchData();
        };np
    }
  },[searchTerm, setProperties]);
  
  
  return (
  <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir='column'>
        <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default SearchFilter;
