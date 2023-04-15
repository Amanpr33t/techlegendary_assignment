import { Flex, Spacer, Input, Button } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SearchActions } from '../store/slices/search-slice'
const Navbar = () => {
    const dispatch = useDispatch()
    const searchRef = useRef()

    const searchClick = () => {
        dispatch(SearchActions.setSearch(searchRef.current.value))
        searchRef.current.value = ''
    }

    return (
        <>
            <Flex h='60px' bg='gray' flexDirection='row' align='center' position='fixed' top='0px' width='100%' zIndex='sticky'>
                <Spacer></Spacer>
                <Flex flexDirection='row' align='center' >
                    <Input bg='white' ml='20px' mr='10px' variant='outline' placeholder='Search by name' ref={searchRef} w={{ base: '146px', sm: '200px' }} border='1px solid gray' />
                    <Button onClick={searchClick} mr='10px'>Search</Button>
                </Flex >


            </Flex>
        </>
    )
}
export default Navbar