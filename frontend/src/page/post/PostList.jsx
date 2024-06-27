import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faEye,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";
import axios from "axios";
import { PostListOfBest } from "./PostListOfBest.jsx";
import defaultImage from "../../resource/img/unknownImage.png";
import HeadingVariant from "../../css/Heading/HeadingVariant.jsx";
import ContentParser from "../../component/ContentParser.jsx";
import ButtonCircle from "../../css/Button/ButtonCircle.jsx";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import ButtonNumber from "../../css/Button/ButtonNumber.jsx";

function PostList() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const [postList, setPostList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios.get(`/api/post/list?${searchParams}`).then((res) => {
      setPostList(res.data.postList);
      setPageInfo(res.data.pageInfo);
      console.log(res.data.postList);
    });
    setSearchType("all");
    setSearchKeyword("");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");

    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  // 페이지 수
  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  // 검색 클릭 시 URL
  function handleSearchClick() {
    navigate(`/post/list?type=${searchType}&keyword=${searchKeyword}`);
  }

  // 검색 창 Enter 시 URL
  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      navigate(`/post/list?type=${searchType}&keyword=${searchKeyword}`);
    }
  }

  // 페이지 버튼 클릭 시
  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/post/list?${searchParams}`);
  }

  return (
    <Box align="center" justify="center">
      <PostListOfBest />
      <Divider
        border={"1px solid lightGray"}
        w={{ base: "960px", lg: "960px", sm: "660px" }}
        my={"2rem"}
      ></Divider>
      <Flex mx={"1rem"}>
        <HeadingVariant variant={"large"} align={"start"}>
          회원 게시글
        </HeadingVariant>
        <Spacer />
        {account.isLoggedIn() && (
          <Button onClick={() => navigate(`/post/write`)}>글쓰기</Button>
        )}
      </Flex>
      {/* 회원 게시글 페이지 */}
      {postList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
      {postList.length > 0 && (
        <VStack
          divider={<StackDivider />}
          my={"2rem"}
          spacing={{ base: "2rem", lg: "2rem", sm: "1rem" }}
          w={{ base: "720px", lg: "720px", sm: "660px" }}
        >
          {postList.map((post) => (
            <Flex
              key={post.postId}
              onClick={() => navigate(`/post/${post.postId}`)}
              w={{ base: "720px", lg: "720px", sm: "660px" }}
              h={{ base: "240px", lg: "240px", sm: "200px" }}
              cursor={"pointer"}
              py={"1rem"}
              px={"1rem"}
              sx={{
                "&:hover": {
                  backgroundColor: "beige",
                },
              }}
            >
              <Flex
                direction={"column"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                w={"75%"}
                h={"100%"}
                pr={"1rem"}
              >
                <Flex mb={"8px"}>
                  <HeadingVariant overflow={"hidden"} textOverflow={"ellipsis"}>
                    {post.title}
                  </HeadingVariant>
                </Flex>
                <Flex
                  textAlign={"start"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  display={"-webkit-box"}
                  css={{
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <ContentParser content={post.content} />
                </Flex>
                <Spacer />
                <Flex align={"center"}>
                  <Flex align={"center"}>
                    <Box
                      w={"24px"}
                      h={"24px"}
                      mr={1}
                      borderRadius={"100%"}
                      boxShadow={"base"}
                    >
                      <Image src={post.profileName} borderRadius={"100%"} />
                    </Box>
                    <Text overflow={"hidden"} textOverflow={"ellipsis"}>
                      {post.nickName}
                    </Text>
                  </Flex>
                  <Flex pl={"1rem"} color={"lightgray"}>
                    <Text display={{ base: "none", lg: "block" }} mr={1}>
                      조회
                    </Text>
                    <Text display={{ base: "block", lg: "none" }} mr={1}>
                      <FontAwesomeIcon icon={faEye} size={"lg"} />
                    </Text>
                    <Text>{post.view}</Text>
                  </Flex>
                  <Flex pl={"1rem"} color={"lightgray"}>
                    <Text display={{ base: "none", lg: "block" }} mr={1}>
                      좋아요
                    </Text>
                    <Text display={{ base: "block", lg: "none" }} mr={1}>
                      <FontAwesomeIcon icon={faHeart} size={"lg"} />
                    </Text>
                    <Text>{post.likeCount}</Text>
                  </Flex>
                  <Flex pl={"1rem"} color={"lightgray"}>
                    <Text display={{ base: "none", lg: "block" }} mr={1}>
                      댓글
                    </Text>
                    <Text display={{ base: "block", lg: "none" }} mr={1}>
                      <FontAwesomeIcon icon={faComment} size={"lg"} />
                    </Text>
                    <Text>{post.commentCount}</Text>
                  </Flex>
                  <Flex pl={"1rem"} color={"lightgray"}>
                    {post.createDate}
                  </Flex>
                </Flex>
              </Flex>
              <Spacer />
              <Flex
                w={{ base: "200px", lg: "200px", sm: "160px" }}
                h={"100%"}
                align={"center"}
              >
                <Image
                  src={post.picurl || defaultImage}
                  w={{ base: "200px", lg: "200px", sm: "160px" }}
                  h={{ base: "200px", lg: "200px", sm: "160px" }}
                  objectFit={"cover"}
                  borderRadius={"1rem"}
                />
              </Flex>
            </Flex>
          ))}
        </VStack>
      )}
      <Divider
        border={"1px solid lightGray"}
        w={{ base: "720px", lg: "960px" }}
        my={"2rem"}
      ></Divider>
      {/* 게시글 검색 */}
      <Box my={"2rem"}>
        <Flex align={"center"} justify={"center"} gap={10}>
          <Center>
            <Box>
              <Select
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
              >
                <option value={"all"}>전체</option>
                <option value={"titleAndContent"}>제목+내용</option>
                <option value={"nickName"}>닉네임</option>
                <option value={"placeName"}>장소명</option>
                <option value={"address"}>지역명</option>
              </Select>
            </Box>
            <Box>
              <Input
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={"검색어"}
              />
            </Box>
            <Box>
              <ButtonCircle onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="small" />
              </ButtonCircle>
            </Box>
          </Center>
        </Flex>
      </Box>

      {/* 페이징 */}
      <Box>
        <Center>
          {pageInfo.prevPageNumber && (
            <>
              <ButtonNumber onClick={() => handlePageButtonClick(1)}>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </ButtonNumber>
              <ButtonNumber
                onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </ButtonNumber>
            </>
          )}

          {pageNumbers.map((pageNumber) => (
            <ButtonNumber
              key={pageNumber}
              onClick={() => handlePageButtonClick(pageNumber)}
            >
              {pageNumber}
            </ButtonNumber>
          ))}

          {pageInfo.nextPageNumber && (
            <>
              <ButtonNumber
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </ButtonNumber>
              <ButtonNumber
                onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </ButtonNumber>
            </>
          )}
        </Center>
      </Box>
    </Box>
  );
}

export default PostList;
