import React from 'react'
import { Button,Box,Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import AuthContext from "../context/AuthContext";
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
const MainAlert=()=> {
  const {logoutUser}=useContext(AuthContext)
  const opens = true;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [islogout,setLogout]=useState(false)
  useEffect(()=>{
      if(islogout){
        logoutUser();
      }
  },[islogout, logoutUser])
  return (

    <>
      <Button  onClick={onOpen}>تسجيل خروج</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent textAlign="right">
          <AlertDialogHeader> تسجيل الخروج?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          هل أنت متأكد أنك تريد تسجيل الخروج
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <form onSubmit={logoutUser}>
              <Button  type="submit" onClick={onClose} colorScheme='red' ml={3}>
              Yes
            </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default MainAlert;