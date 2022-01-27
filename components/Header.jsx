import {
  Container,
  Text,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Header() {
    const[likes, setLikes] = useState([]);
    
    useEffect(() => {
        setLikes(JSON.parse(localStorage.getItem("likes")));
    }, [])

    return (
      <Box bg="teal.500" h="80px" mb={10}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" h="80px">
              <Link href="/">
            <Text as="a" fontWeight="bold" fontSize="2xl" color="white">
              おすすめワインを集めました！
            </Text>
            </Link>
            <Box style={{ position: "relative" }}>
              <Icon as={FaStar} w={10} h={10} color="white" />
              <Text
                fontSize="sm"
                fontWeight="bold"
                style={{
                  color: "green",
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  textAlign: "center"
                }}
              >
                {likes.length}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    )
}