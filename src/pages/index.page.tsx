import React from "react";
import {
  Container,
  Text,
  Card,
  CardBody,
  VStack,
  Checkbox,
  HStack,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

import { Form, Pagination } from "@/features/todo/components";
import { useForm, useAppSelector, useMutations } from "@/features/todo/hooks";
import {
  getRunningQueriesThunk,
  getTodos,
  useGetTodosQuery,
} from "@/store/api";
import { wrapper } from "@/store";

const PAGE_SIZE = 5;
const TOTAL_COUNT = 200;

export default function Home() {
  const title = useAppSelector((state) => state.form.title);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const { handleChange, showForm, setShowForm } = useForm();
  const { handleDelete, handleSubmit, handleUpdate } = useMutations();

  const { data } = useGetTodosQuery(currentPage, {
    pollingInterval: 10000,
  });

  return (
    <>
      <Container maxW="container.sm" mt={14} mb={6}>
        <VStack spacing={4}>
          <Text
            textAlign="center"
            color="primary"
            fontSize="7xl"
            lineHeight="87.14px"
            fontWeight="900"
          >
            Daily Todo
          </Text>

          {data?.map((el) => (
            <Popover key={el.id} placement="right" trigger="hover">
              <PopoverTrigger>
                <Card w="445px">
                  <CardBody>
                    <HStack justify="space-between">
                      <Editable defaultValue={el.title}>
                        <EditableInput
                          fontSize="2xl"
                          lineHeight="29.05px"
                          fontWeight="extrabold"
                          color="secondary"
                          textDecor={el.completed ? "line-through" : "none"}
                        />
                        <EditablePreview
                          fontSize="2xl"
                          lineHeight="29.05px"
                          fontWeight="extrabold"
                          color="secondary"
                          textDecor={el.completed ? "line-through" : "none"}
                        />
                      </Editable>

                      <Checkbox
                        colorScheme="gray"
                        isChecked={el.completed}
                        onChange={(e) => handleUpdate(e, el)}
                      />
                    </HStack>
                  </CardBody>
                </Card>
              </PopoverTrigger>
              <PopoverContent w="min-content" rounded="full">
                <Button
                  w="40px"
                  h="40px"
                  rounded="full"
                  _hover={{
                    bg: "transparent",
                  }}
                  bg="transparent"
                  borderColor="red.500"
                  borderWidth={3}
                  onClick={() => handleDelete(el.id)}
                >
                  <CloseIcon w={3} color="red.500" />
                </Button>
              </PopoverContent>
            </Popover>
          ))}

          <Form isShow={showForm} onChange={handleChange} value={title} />
          <Pagination
            currentPage={currentPage}
            totalCount={TOTAL_COUNT}
            pageSize={PAGE_SIZE}
          />

          {showForm ? (
            <HStack spacing={4}>
              <Button
                w="40px"
                h="40px"
                rounded="full"
                _hover={{
                  bg: "transparent",
                }}
                bg="transparent"
                borderColor="#94A3B8"
                borderWidth={3}
                onClick={() => setShowForm(false)}
              >
                <CloseIcon w={3} color="#94A3B8" />
              </Button>

              <Button
                w="40px"
                h="40px"
                rounded="full"
                _hover={{
                  bg: "transparent",
                }}
                onClick={handleSubmit}
                bg="transparent"
                borderColor="#94A3B8"
                borderWidth={3}
              >
                <CheckIcon color="#94A3B8" />
              </Button>
            </HStack>
          ) : (
            <Button
              w="40px"
              h="40px"
              rounded="full"
              _hover={{
                bg: "transparent",
              }}
              bg="transparent"
              borderColor="#94A3B8"
              borderWidth={3}
              onClick={() => setShowForm(true)}
            >
              <AddIcon width={14} color="#94A3B8" />
            </Button>
          )}
        </VStack>
      </Container>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getTodos.initiate(1));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
