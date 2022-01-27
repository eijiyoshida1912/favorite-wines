import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  ButtonGroup,
  SimpleGrid,
  Flex,
  Center,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Post({ post }) {
  const [likes, setLikes] = useState([]);

  const addLike = () => {
    // お気に入り配列に既にIDがある場合true
    let likeCheck;
    let datalist;
    if (localStorage.getItem("likes")) {
      datalist = JSON.parse(localStorage.getItem("likes"));
    } else {
      datalist = [];
    }

    if (datalist) {
      likeCheck = datalist.includes(post.id);
    }

    if (!datalist.length || !likeCheck) {
      datalist.push(post.id);
    }

    setLikes(JSON.parse(localStorage.getItem("likes")));
    localStorage.setItem("likes", JSON.stringify(datalist));
  };

  console.log(post);
  return (
    <>
      <Breadcrumb mb={6} fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{post.wine}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justify="center">
        <Image
          src={post.image}
          alt={post.wine}
          width={300}
          height={300}
          objectFit="contain"
        />
        <Box>
          <Text fontSize="4xl" mb={2}>
            {post.wine}
          </Text>
          <Box display="flex" mb="4" alignItems="center">
            <Text mr={2}>{post.rating.average}</Text>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar
                  key={i}
                  color={i < post.rating.average ? "green" : "gray"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {post.rating.reviews}
            </Box>
          </Box>

          <Box as="dl">
            <Text as="dt" fontWeight="bold">
              location
            </Text>
            <Text as="dd" mb={1}>
              {post.location}
            </Text>
            <Text as="dt" fontWeight="bold">
              winery
            </Text>
            <Text as="dd" mb={1}>
              {post.winery}
            </Text>
          </Box>
          <Button
            colorScheme="teal"
            variant="outline"
            rounded="full"
            mt={4}
            onClick={addLike}
          >
            お気に入りに追加
          </Button>
        </Box>
      </Flex>
    </>
  );
}

// この関数はビルド時に呼ばれる
export async function getStaticPaths() {
  // 記事を取得する外部APIのエンドポイントをコール
  const res = await fetch("https://api.sampleapis.com/wines/reds");
  const posts = await res.json();

  // 記事にもとづいてプリレンダするパスを取得
  const paths = posts.map((post) => `/wines/${post.id}`);

  // 設定したパスのみ、ビルド時にプリレンダ
  // { fallback: false } は、他のルートが404になるという意味
  return { paths, fallback: false };
}

// この関数もビルド時に呼ばれる
export async function getStaticProps({ params }) {
  // `params`は`id`の記事内容を含む
  // ルートが/posts/1とすると、params.idは1となる
  const res = await fetch(`https://api.sampleapis.com/wines/reds/${params.id}`);
  const post = await res.json();

  // propsを通じてpostをページに渡す
  return { props: { post } };
}
