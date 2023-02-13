import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface IForm {
  isShow: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Form: React.FC<IForm> = ({ isShow, value, onChange }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isShow) {
      ref?.current?.focus();
    }
  }, [isShow]);

  return (
    <Card w="455px" display={isShow ? "block" : "none"}>
      <CardBody>
        <FormControl>
          <FormLabel
            color="secondary"
            fontWeight="semibold"
            fontSize={14}
            lineHeight="20px"
          >
            Title
          </FormLabel>
          <Input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e)}
          />
        </FormControl>
      </CardBody>
    </Card>
  );
};
