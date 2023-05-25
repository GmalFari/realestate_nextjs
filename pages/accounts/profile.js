import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Grid,
    Text,
    Stack,
    Button,
  } from '@chakra-ui/react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { useContext,useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';  
import { useRouter } from 'next/router';
export default function SocialProfileWithImage() {
  const {user,authTokens} = useContext(AuthContext);
  const [userDetail,setuserDetail]=useState()
  const router = useRouter();
  let getuserdetail = async ()=>{
    console.log('update tokens')
    try{
      let response = await fetch('http://127.0.0.1:8000/auth/users/me/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${authTokens?.access}`

      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setuserDetail(data)
      console.log(userDetail)
      // router.push("/")
    }else {
      alert(error)
    }
    }catch(errors){
      alert(errors)
    }
  };
  useEffect(()=>{
    getuserdetail()
  },[])
  console.log(user)
    return (
      // <>
      //   hello 
      //   {userDetail?userDetail?.first_name:''}
      // </>

     
           <Box paddingTop={"100px"}>
           <Center> 
           <Box  
              maxW={'300px'}
              w={'full'}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Center>
              <Link href={`/accounts/`} passHref>
              {/* <Image
                h={'170px'}
                w={'full'}
                src={
                //   company.logo.url
                }
                objectFit={'fill'}
                alt={'agencies image'}
              /> */}
              <Avatar>

              </Avatar>
              </Link>
              </Center>
              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'lg'} align={'center'} fontWeight={500} fontFamily={'body'}>
                  {userDetail?userDetail?.first_name:''}  {userDetail?userDetail?.last_name:''}
                  </Heading>
                </Stack>
                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>3</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Agent
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>3</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                    properties
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
</Center>
    </Box>
    );
  }
// export async function getServerSideProps({params: {id}}){
//     const data = await fetchApi(`http://127.0.0.1:8000/auth/users/me/`)
//     return {
//         props : {
//             userDetail:data
//         }
//     }
// }
