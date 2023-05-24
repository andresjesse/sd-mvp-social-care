import React, { ReactNode } from "react";
import useStyles from "./styles";

interface StyledCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function StyledCard({ children, onClick }: StyledCardProps) {
  const { classes } = useStyles();

  return (
    <div onClick={onClick} className={classes.root}>
      <div className={classes.body}>{children}</div>
    </div>
  );
}
