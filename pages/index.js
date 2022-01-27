import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import fetch from "isomorphic-fetch";
import { FaStar, FaAngleRight } from "react-icons/fa";
import {
  Box,
  Button,
  ButtonGroup,
  SimpleGrid,
  Flex,
  Center,
} from "@chakra-ui/react";

Home.getInitialProps = async () => {
  const res = await fetch(`https://api.sampleapis.com/wines/reds`);
  const data = await res.json();
  return {
    wines: data,
  };
};

export default function Home(props) {
  return (
    <>
      <SimpleGrid minChildWidth="200px" spacing="40px">
        {props.wines.map((wine) => (
          <Link href={`/wines/${wine.id}`} key={wine.id}>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              _hover={{ opacity: 0.8, cursor: "pointer" }}
            >
              <Flex h={200} justify="center" align="center" bg="gray.100">
                <Image
                  src={wine.image}
                  alt={wine.wine}
                  width={100}
                  height={150}
                  objectFit="contain"
                />
              </Flex>
              <Box p="6">
                <Box
                  mt="1"
                  mb="1"
                  fontWeight="bold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {wine.wine}
                </Box>
                <p>{wine.location}</p>

                <Box display="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < wine.rating.average ? "green" : "gray"}
                      />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {wine.rating.reviews}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
}
