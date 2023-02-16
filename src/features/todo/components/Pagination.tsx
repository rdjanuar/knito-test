import React from "react";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import {
  usePagination,
  DOTS,
  useAppDispatch,
  useAppSelector,
} from "@/features/todo/hooks";
import type { IUsePagination } from "@/utils";
import { setPage } from "@/store/slice/paginationSlice";

const Pagination: React.FC<IUsePagination> = ({
  totalCount,
  siblingCount = 1,
  pageSize,
}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const onNext = () => {
    if (currentPage === lastPage) return;
    dispatch(setPage(currentPage + 1));
  };

  const onPrevious = () => {
    if (currentPage === 1) return;

    dispatch(setPage(currentPage - 1));
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <Flex gap="9px">
      <Button
        onClick={onPrevious}
        bg="#94A3B8"
        _hover={{
          bg: "#94A3B8",
        }}
        disabled={currentPage === 1}
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
      >
        <ArrowBackIcon />
      </Button>

      {paginationRange?.map((el, idx) => {
        if (el === DOTS) {
          return <div key={idx}>...</div>;
        }

        return (
          <HStack key={idx}>
            <Button
              _hover={{
                bg: currentPage === el ? "gray.500" : "transparent",
              }}
              bg={currentPage === el ? "gray.500" : "transparent"}
              onClick={() => dispatch(setPage(el as number))}
            >
              <Text color="secondary" fontWeight="bold">
                {el as number}
              </Text>
            </Button>
          </HStack>
        );
      })}
      <Button
        onClick={onNext}
        bg="#94A3B8"
        _hover={{
          bg: "#94A3B8",
        }}
        cursor={currentPage === lastPage ? "not-allowed" : "pointer"}
      >
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
