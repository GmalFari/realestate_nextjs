import Link from 'next/link';
import Image from 'next/image';
import {Flex,Box,Text,Button, Heading,Grid} from '@chakra-ui/react';
import Property from '../components/Property';
import {baseUrl,fetchApi} from '../utils/fetchApi';
import MainCard from "../components/MainCard";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Carousel from '../components/Carousel';
import Rent from "../assets/images/Rent_a_home.webp";
import Sell from "../assets/images/Sell_a_home.webp";
import Buy from "../assets/images/Buy_a_home.webp";
import HorizonalCard from "../components/HorizonalCard";
import { useEffect } from 'react';
import { BsNodePlusFill } from 'react-icons/bs';
const Banner = ({purpose , property_title,title2,desc1,desc2,buttonText,linkName,imageUrl }) => 
(
  <Flex  flexWrap="wrap" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"  />
    <Box m="10">
      <Text color="gray.500" fontSize="sm" fontWeight="medium" >{purpose}</Text>
      <Text  fontSize="3xl" fontWeight="bold" >{property_title}<br/>{property_title}</Text>
      <Text color="gray.700" paddingTop="3" paddingBottom="3"  fontSize="lg"  >{desc1}<br/> {desc2}</Text>
      <Button fontSize="xl">
          {/* <Link href={linkName} > {buttonText}</Link> */}
      </Button>
  </Box>
  </Flex>
)


export default function Home({propertiesForSale,propertiesForRent}) {
  // useEffect(() => {
  //   localStorage.getItem('token')?console.log(localStorage.getItem('token')):console.log('notfound')
    
  // }, []);
  return (
  
   <Box>
    <Carousel />
     <Box 
     ms={['2px','50px','100px']}
     m={['2px','50px','100px']}> 
      <Box textAlign="center" margin='10px' fontSize="40px" 
      fontWeight="bold">   اَخر العقارت 
      </Box>
      <Box display="flex" flexFlow="row" flexWrap="nowrap" overflowY="hidden" >
      {propertiesForRent.map((property) => <MainCard  property={property} key={property.id} />)}
    </Box>
    <Box display="flex" flexFlow="row" flexWrap="nowrap" overflowY="hidden" overflowX={propertiesForRent?scroll:BsNodePlusFill}>
    </Box>
      <Box display={['Flex']} 
         flexDirection={['column','column','column','column','row']}  
        justifyContent="center"
        alignItems="center"
        >
        <Link href="/search?purpose=for-rent">
        <Section1 image={Rent} title="أستأجر عقار " content="نحن نخلق تجربة سلسة عبر الإنترنت - من التسوق على أكبر شبكة تأجير ، إلى التقديم ، إلى دفع الإيجار."  />
        </Link>
        <Link href="/search?purpose=for-sale">
        <Section1 image={Buy} title=" أشتري عقار" content="اعثر على مكانك من خلال تجربة صور غامرة ومعظم القوائم ، بما في ذلك الأشياء التي لن تجدها في أي مكان آخر."/>
        </Link>
        <Section1  image={Sell} title="بيع عقار " content="بغض النظر عن المسار الذي تسلكه لبيع منزلك ، يمكننا مساعدتك في اجتياز عملية بيع ناجحة." />
      </Box>
      <Box  mt="100px" textAlign="center" >
      <Heading fontFamily={'body'} as="h2">
      العقارات الأكثر بحثاً
      </Heading>
      <Section2 />
      </Box>     
      </Box>
   </Box>
  )
}
 

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`http://127.0.0.1:8000/api/list-properties/`)
  const propertyForRent = await fetchApi(`http://127.0.0.1:8000/api/list-properties/`)
  return {
    props: {
      propertiesForSale:propertyForSale?.results,
      propertiesForRent:propertyForRent?.results,

    }
  }
}