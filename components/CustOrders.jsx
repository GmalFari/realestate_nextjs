import React, { useState,useEffect } from 'react';
import dayjs from 'dayjs';

import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  Grid,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { useContext } from 'react';
import useAxios from '../utils/useAxios';
import Autocomplete from './AutoComplete';
import MyMap from './Mymap';
import yemenGis from "../utils/yemenGis.json";
import gadm41_YEM_1 from "../utils/gadm41_YEM_1.json";
import {typeProperty} from "../utils/selectedData";
import {viewList} from "../utils/viewList";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

const Form1 = ({data,
                handleChange,
                purposeList,
                rentFrequencyList
                })=> {
  return (
    <>
    
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
      أطلب عقار
      </Heading>
      
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="typeProperty"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
           نوع العقار
        </FormLabel>
        <Select
          direction="rtl"
          id="typeProperty"
          name="typeProperty"
          autoComplete="typeProperty"
          placeholder=" نوع العقار"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={handleChange}
          >
          {typeProperty.map((typeP)=>{
        return (
            <option key={typeP} value={typeP}>{typeP}</option>
        )
  })}
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="purpose"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
           الغرض 
        </FormLabel>
        <Select
          direction="rtl"
          id="purpose"
          name="purpose"
          autoComplete="purpose"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={handleChange}
          >
          {purposeList.map((purposeItem,index)=>(
          <option key={index} >{purposeItem}</option>
          ))}
        </Select>
      </FormControl>
     <Box width={["100%","fit-content"]}>
        <FormLabel htmlFor="view" fontWeight={'normal'}>
          عقد الإيجار
          </FormLabel>
        <Select
          direction="rtl"
          id="typeProperty"
          name="typeProperty"
          autoComplete="typeProperty"
          focusBorderColor="brand.400"
          shadow="sm"
          size="md"
          w="full"
          rounded="md"
          onChange={handleChange}
          >
          {rentFrequencyList.map((propertyview)=>{
        return (
            <option key={propertyview} value={propertyview} >{propertyview}</option>
        )
  })}
        </Select>
        </Box>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
      إسم المدينة
        </FormLabel>
        <Select
          id="city"
          name="city"
          autoComplete="city"
          placeholder="إسم المدينة"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          required="required"
          onChange={handleChange}
          >
         {gadm41_YEM_1.features.map((city,index)=>{
      return (
      <option key={index} value={`${city['properties']['NL_NAME_1']}`}
      >{` ${city['properties']['NL_NAME_1']} `}</option>
      )
      })}
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
                  إسم المديرية
        </FormLabel>
        <Select
          id="city"
          name="city"
          autoComplete="city"
          placeholder="إسم المديرية"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          required="required"
          onChange={handleChange}
          >
         {yemenGis.features.filter(Directorate => 
            Directorate['properties']['NL_NAME_1'] ==data.city
        ).map((Directorate,index) =>(
          <option key={index} value={`${Directorate['properties']['NL_NAME_2']}`}>{`${Directorate['properties']['NL_NAME_2']}`}</option>
        ))
        }
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor=""
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
                إسم المنطقة/الحي
        </FormLabel>
        <Input
          type="text"
          name=""
          id=""
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          placeholder='مثال: سعوان , السنينة , المطار'
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
      إسم الشارع
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          placeholder='مثال: شارع الستين, التحرير, شارع الثلاثين'
        />
      </FormControl>

    </>
  );
};

const Form2 = ({myData,setData,title,handleChange,setTitle,setImg}) => {
  let {loginUser} = useContext(AuthContext)
  console.log()
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
      بيانات العقار
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <Input
          type="text"
          name="order_title"
          id="title"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={myData.order_title}
          onChange={handleChange}
          // onChange={e=>{setTitle(e.target.value)}}
        />
      </FormControl>
        <FormControl as={GridItem} id="desc" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            التفاصيل الكاملة للعقار
          </FormLabel>
          <Textarea
          
            rows={4}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>
          التفاصيل الكاملة للطلب
          </FormHelperText>
        </FormControl>
        
      </SimpleGrid>
    </>
  );
};
const Form3 = () => {
  const [selectView ,setSelectView] =useState()
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleViewChange = (e)=>{
    setSelectView(e.target.value)
  }

 
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
      وصف العقار
      </Heading>
      <Grid
        templateColumns='repeat(auto-fit, minmax(150px, 1fr))'
        gap={4}
>
    <Box width={["100%","fit-content"]}>
          <FormLabel htmlFor="space" fontWeight={'normal'}>
          المساحة بالمتر
          </FormLabel>
          <Input type="number" id="space" placeholder="المساحة" />
        </Box>
        
        <Box width={["100%","fit-content"]}>
        <FormLabel htmlFor="view" fontWeight={'normal'}>
          الإطلالة
          </FormLabel>
        <Select
          direction="rtl"
          id="typeProperty"
          name="typeProperty"
          autoComplete="typeProperty"
          placeholder="الإطلالة"
          focusBorderColor="brand.400"
          shadow="sm"
          size="md"
          w="full"
          rounded="md"
          onChange={handleViewChange}
          >
          {viewList.map((propertyview)=>{
        return (
            <option key={propertyview} value={propertyview} >{propertyview}</option>
        )
  })}
        </Select>
        </Box>
        <Box width={["100%","fit-content"]}>
          <FormLabel htmlFor="rooms" fonsSize={'sm'} fontWeight={'normal'}>
          عدد الغرف
          </FormLabel>
          <Input id="price" placeholder="عدد الغرف" />
        </Box>
        <Box width={["100%","fit-content"]}>
          <FormLabel htmlFor="baths" fonsSize={'sm'} fontWeight={'normal'}>
          عدد الحمامات
          </FormLabel>
          <Input id="price" placeholder="عدد الحمامات" />
        </Box>
        <Box width={["100%","fit-content"]}>
        <FormLabel htmlFor="view" fontWeight={'normal'}>
          نوع التشطيب
          </FormLabel>
          <Input
            pr="4.5rem"
            type={'text'}
          />
        </Box>
        </Grid>
        <FormControl>
          <Input
            pr="4.5rem"
            type={'text'}
          />
      </FormControl>
    </>
  );
};

export default function CustOrders({myData,setData}) {
  const [submitted,setSubmitted]=useState(false);
  const [apiMessage,setApiMessage]= useState([])
 const newData = Object.keys(apiMessage).map((key) => {
    return {
      "key": key,
      "value": apiMessage[key]
    };
  });  
  const toast = useToast({
    position: 'top',
    // 'textAlign':'end',
    title: '',
    containerStyle: {
      'textAlign':'center',
      // 'display':'flex',
      // 'justifyContent':'right',
      marginTop:'2em',
      width: '400px',
      Height:"400px",
      maxWidth: '100%',
    },
  });
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  //form1
  const purposeList = ['للإيجار','للشراء']
  const rentFrequencyList = ['يومي','اسبوعي','شهري','سنوي','نصف سنوي','ربع سنوي']
 //  //form2
   const [img,setImg] = useState("")
  const initailData ={  };
  // const [data,setData] = useState(myData)
  
   //form3
  

  let testApi = async(e)=>{
    let token = JSON.parse(localStorage.getItem("authTokens"))
    let accessToken = token?.access
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/list-properties/'
        const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',            
            // 'Content-Disposition':"none",
       
          // 'Content-Disposition':"none",
          'Accept-Encoding': 'gzip',
          // 'content-type': 'application/x-www-form-urlencoded',

          // 'Content-Type':'application/x-www-form-urlencoded',
          "Authorization" : `Bearer ${accessToken}`,
        },

        body: JSON.stringify(
          {...myData
            
          }
        )
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (response.status ===201){
          setSubmitted(true)
          // setApiMessage(result)
          console.log(result)
        }else {
          setSubmitted(false)
          setApiMessage(result)
          console.log(result)
        }
          
    
      } catch (error) {
        // setApiMessage(error)
        console.log(error)
        setSubmitted(false)
        alert(error)
        setApiMessage(error)

      }
    }
    
    const handleSubmit = async e => {
    
      e.preventDefault();
      testApi();
    };

    const handleChange = (e) => {
      console.log(myData.order_title)

      setData({
        ...myData,
        [e.target.name]: e.target.value,
        // coverPhoto:e.target.files[0],
      });
    };
  return (
    <>
      <div
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
        //   hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
          ></Progress>
        {step === 1 ? <Form1 
                        data={myData}
                        purposeList={purposeList}
                        rentFrequencyList={rentFrequencyList}
                        handleChange={handleChange}
                        />
                         : step === 2 ? <Form2 myData={myData} setData={setData} handleChange={handleChange} title={myData.order_title}  setImg={setImg} /> :
                          <Form3  />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <form onSubmit={testApi}>  
                          <Button
                type="submit"
                w="8rem"
                colorScheme="teal"
                variant="solid"
                onClick={() => {submitted?
        
              toast({
                title: `لقد تم إضافة الطلب`,

                status:'success',
                isClosable: true,
              })
            :
              toast({
                title: ` خطأ`,
                description:newData.map((m,i)=>(
                    <>
                      {m.key}: {m.value}
                    </>
                )),
                status: 'error',
                isClosable: true,
              })
            
                }}
                >
                إضافة طلب
              </Button>
        </form>
            ) : null}
          </Flex>
        </ButtonGroup>
        
      </div>
    </>
  );
}

// export default CustOrders;