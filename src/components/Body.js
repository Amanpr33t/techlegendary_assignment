import { useState } from "react"
import data from '../heliverse_mock_data.json'
import { Card, CardBody, Image, Heading, Text, Flex, Box } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate';
import './Body.css'
import { useSelector, useDispatch } from "react-redux";
import { SearchActions } from "../store/slices/search-slice";
import { AddIcon } from '@chakra-ui/icons'
import './Paginate.css'

const Body = () => {
    const dispatch = useDispatch()
    const [available, setAvailable] = useState('')
    const [domain, setDomain] = useState('')
    const [gender, setGender] = useState('')
    const searchName = useSelector(state => state.Search.searchName)

    const [postsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1)
    };
    let dataPaginate
    let currentPosts
    if (searchName !== '') {
        const searchCallback = (item) => {
            return item.first_name.toUpperCase().includes(searchName.toUpperCase()) === true || item.last_name.toUpperCase().includes(searchName.toUpperCase()) === true
        }
        currentPosts = data.filter(searchCallback).slice(indexOfFirstPost, indexOfLastPost);
        dataPaginate = data.filter(searchCallback)
    } else {
        if (domain === '' && gender === '' && available === '') {
            currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
            dataPaginate = data
        } else if (domain !== '' && gender !== '' && available === '') {
            const filterCallback = (item) => {
                return item.domain.toUpperCase() === domain.toUpperCase() && item.gender.toUpperCase() === gender.toUpperCase()
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain !== '' && gender === '' && available !== '') {
            const filterCallback = (item) => {
                if (available === 'true') {
                    return item.available === true && item.domain.toUpperCase() === domain.toUpperCase()
                } else {
                    return item.available === false && item.domain.toUpperCase() === domain.toUpperCase()
                }
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain === '' && gender !== '' && available !== '') {
            const filterCallback = (item) => {
                if (available === 'true') {
                    return item.available === true && item.gender.toUpperCase() === gender.toUpperCase()
                } else {
                    return item.available === false && item.gender.toUpperCase() === gender.toUpperCase()
                }
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain !== '' && gender === '' && available === '') {
            const filterCallback = (item) => {
                return item.domain.toUpperCase() === domain.toUpperCase()
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain === '' && gender !== '' && available === '') {
            const filterCallback = (item) => {
                return item.gender.toUpperCase() === gender.toUpperCase()
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain === '' && gender === '' && available !== '') {
            const filterCallback = (item) => {
                if (available === 'true') {
                    return item.available === true
                } else {
                    return item.available === false
                }
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        } else if (domain !== '' && gender !== '' && available !== '') {
            const filterCallback = (item) => {
                if (available === 'true') {
                    return item.available === true && item.domain.toUpperCase() === domain.toUpperCase() && item.gender.toUpperCase() === gender.toUpperCase()
                } else {
                    return item.available === false && item.domain.toUpperCase() === domain.toUpperCase() && item.gender.toUpperCase() === gender.toUpperCase()
                }
            }
            currentPosts = data.filter(filterCallback).slice(indexOfFirstPost, indexOfLastPost);
            dataPaginate = data.filter(filterCallback)
        }
    }


    return (
        <>
            <Flex flexDirection='column' mt='60px'>
                <Box >
                    <div className="dropdown">
                        <button className="dropbtn"  >{<AddIcon />} Filters </button>

                        <div className="dropdown-content" >
                            <div className="available">Available
                                <div className='dropdown-available'>
                                    <div onClick={() => {
                                        setAvailable('true')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>True</div>
                                    <div onClick={() => {
                                        setAvailable('false')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>False</div>
                                </div>
                            </div>
                            <div className="gender">Gender
                                <div className='dropdown-gender'>
                                    <div onClick={() => {
                                        setGender('male')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Male</div>
                                    <div onClick={() => {
                                        setGender('female')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Female</div>
                                </div>
                            </div>
                            <div className="domain">Domain
                                <div className='dropdown-domain'>
                                    <div onClick={() => {
                                        setDomain('Sales')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Sales</div>
                                    <div onClick={() => {
                                        setDomain('Marketing')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Marketing</div>
                                    <div onClick={() => {
                                        setDomain('IT')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>IT</div>
                                    <div onClick={() => {
                                        setDomain('Management')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Management</div>
                                    <div onClick={() => {
                                        setDomain('UI Designing')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>UI Designing</div>
                                    <div onClick={() => {
                                        setDomain('Business Development')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Business Development</div>
                                    <div onClick={() => {
                                        setDomain('Finance')
                                        dispatch(SearchActions.setSearch(''))
                                    }}>Finance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>

                <Flex flexWrap='wrap' justify='center' mt='10px' gap='20px' >
                    {currentPosts && currentPosts.map((content) => {
                        return <Card id='card' key={content.id} w='370px' border='2px solid gray' mr='5px' ml='5px' >
                            <CardBody>
                                <Flex align='center' justify='center'>
                                    <Image
                                        src={content.avatar}
                                    />
                                </Flex>

                                <Flex flexDirection='column' mt='5px'>
                                    <Flex flexDirection='row' align='center' mb='5px'>
                                        <Heading fontSize='20px' fontWeight='500' minW='100px' >Name</Heading>
                                        <Text color='gray' fontSize='16px' fontWeight='500'>{content.first_name} {content.last_name} </Text>
                                    </Flex>
                                    <Flex flexDirection='row' align='center' mb='5px'>
                                        <Heading fontSize='20px' fontWeight='500' minW='100px' >Gender</Heading>
                                        <Text color='gray' fontSize='16px' fontWeight='500' textAlign='start'>{content.gender}</Text>
                                    </Flex>
                                    <Flex flexDirection='row' align='center' mb='5px'>
                                        <Heading fontSize='20px' fontWeight='500' minW='100px' >Email</Heading>
                                        <Text color='gray' fontSize='16px' fontWeight='500'>{content.email}</Text>
                                    </Flex>
                                    <Flex flexDirection='row' align='center' mb='5px'>
                                        <Heading fontSize='20px' fontWeight='500' minW='100px' >Domain</Heading>
                                        <Text color='gray' fontSize='16px' fontWeight='500'>{content.domain}</Text>
                                    </Flex>
                                    <Flex flexDirection='row' align='center' mb='5px'>
                                        <Heading fontSize='20px' fontWeight='500' minW='100px' >Available</Heading>
                                        <Text color='gray' fontSize='16px' fontWeight='500'>{content.available.toString().charAt(0).toUpperCase() + content.available.toString().slice(1)}</Text>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>
                    })}
                </Flex>
            </Flex>
            <ReactPaginate
                onPageChange={paginate}
                pageCount={Math.ceil(dataPaginate.length / postsPerPage)}
                previousLabel={'Prev'}
                breakLabel={'.....'}
                breakClassName={'break-class'}
                nextLabel={'Next'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'previous'}
                nextLinkClassName={'next'}
                activeLinkClassName={'active'}
            />
        </>
    )
}
export default Body