import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UnstyledButton } from "@mantine/core";
import React, { ReactNode } from "react";
import useStyles from "./styles";

interface StyledCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function StyledCard({ children, onClick }: StyledCardProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        {onClick && (
          <UnstyledButton onClick={onClick} pos="absolute" right={0}>
            <FontAwesomeIcon
              color="white"
              size="xl"
              icon={faArrowUpRightFromSquare}
            />
          </UnstyledButton>
        )}
        {children}
      </div>
    </div>
  );
}
